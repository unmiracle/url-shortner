import {
  BadRequestException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUrlDto } from '../dto/create-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../entities/url.entity';
import { Repository } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { TransitionsService } from './transitions.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly repository: Repository<Url>,
    private readonly transitionsService: TransitionsService,
  ) {}

  private nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    8,
  );

  async generateShortUrl() {
    let hash: string;
    let count: number;

    do {
      hash = this.nanoid();
      count = await this.repository.count({
        where: { shortUrl: hash },
      });
    } while (count > 0);

    return hash;
  }

  async create(createUrlDto: CreateUrlDto) {
    if (createUrlDto.alias) {
      const count = await this.repository.count({
        where: { alias: createUrlDto.alias },
      });

      if (count > 0)
        throw new BadRequestException('Alias has been already taken');
    }

    const hash = await this.generateShortUrl();

    const url = this.repository.create({
      ...createUrlDto,
      shortUrl: hash,
    });

    return await this.repository.save(url);
  }

  async info(shortUrlOrAlias: string) {
    return await this.findOne(shortUrlOrAlias);
  }

  async redirect(shortUrlOrAlias: string, ip: string) {
    const url = await this.findOne(shortUrlOrAlias);

    const currentDatetime = new Date();

    if (url.expiresAt && currentDatetime > new Date(url.expiresAt)) {
      throw new GoneException();
    }

    await this.transitionsService.create({ ip, urlId: url.id });

    return url;
  }

  async findOne(shortUrlOrAlias: string) {
    const url = await this.repository
      .createQueryBuilder('url')
      .select()
      .where('url.shortUrl = :shortUrlOrAlias', { shortUrlOrAlias })
      .orWhere('url.alias = :shortUrlOrAlias', { shortUrlOrAlias })
      .getOne();

    if (!url) throw new NotFoundException();

    return url;
  }

  async remove(shortUrlOrAlias: string) {
    const result = await this.repository
      .createQueryBuilder()
      .delete()
      .from('urls')
      .where('shortUrl = :shortUrlOrAlias', { shortUrlOrAlias })
      .orWhere('alias = :shortUrlOrAlias', { shortUrlOrAlias })
      .execute();
    return result;
  }
}

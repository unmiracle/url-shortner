import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transition } from '../entities/transition.entity';
import { Repository } from 'typeorm';
import { CreateTransitionDto } from '../dto/create-transitions.dto';

@Injectable()
export class TransitionsService {
  constructor(
    @InjectRepository(Transition)
    private readonly repository: Repository<Transition>,
  ) {}

  async create(createTransitionDto: CreateTransitionDto) {
    await this.repository.save({
      url: { id: createTransitionDto.urlId },
      ip: createTransitionDto.ip,
    });
  }

  async analytics(shortUrlOrAlias: string) {
    const count = await this.repository
      .createQueryBuilder('t')
      .leftJoin('t.url', 'u')
      .where('u.shortUrl = :shortUrlOrAlias', { shortUrlOrAlias })
      .orWhere('u.alias = :shortUrlOrAlias', { shortUrlOrAlias })
      .getCount();

    const transitions = await this.find(shortUrlOrAlias, 5);
    return {
      clicksCount: count,
      transitions,
    };
  }

  async find(shortUrlOrAlias: string, limit?: number) {
    const queryBuilder = this.repository
      .createQueryBuilder('t')
      .leftJoin('t.url', 'u')
      .where('u.shortUrl = :shortUrlOrAlias', { shortUrlOrAlias })
      .orWhere('u.alias = :shortUrlOrAlias', { shortUrlOrAlias })
      .orderBy('t.createdAt', 'ASC');

    if (limit) {
      queryBuilder.limit(limit);
    }

    const items = await queryBuilder.getMany();

    return items;
  }
}

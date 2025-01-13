import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UrlService } from './services/url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { TransitionsService } from './services/transitions.service';

@Controller('url')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly transitionsService: TransitionsService,
  ) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get('info/:shortUrlOrAlias')
  info(@Param('shortUrlOrAlias') shortUrlOrAlias: string) {
    return this.urlService.info(shortUrlOrAlias);
  }

  @Delete(':shortUrlOrAlias')
  remove(@Param('shortUrlOrAlias') shortUrlOrAlias: string) {
    return this.urlService.remove(shortUrlOrAlias);
  }

  @Get('analytics/:shortUrlOrAlias')
  analytics(@Param('shortUrlOrAlias') shortUrlOrAlias: string) {
    return this.transitionsService.analytics(shortUrlOrAlias);
  }
}

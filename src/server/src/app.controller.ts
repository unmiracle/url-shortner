import { Controller, Get, Ip, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { UrlService } from './url/services/url.service';

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortUrlOrAlias')
  async redirect(
    @Param('shortUrlOrAlias') shortUrlOrAlias: string,
    @Ip() ip: string,
    @Res() response: Response,
  ) {
    const url = await this.urlService.redirect(shortUrlOrAlias, ip);
    return response.redirect(url.originalUrl);
  }
}

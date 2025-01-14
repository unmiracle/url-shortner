import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { UrlService } from './url/services/url.service';

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortUrlOrAlias')
  async redirect(
    @Param('shortUrlOrAlias') shortUrlOrAlias: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const ip = this.getUserIp(request);
    const url = await this.urlService.redirect(shortUrlOrAlias, ip);

    return response.redirect(url.originalUrl);
  }

  private getUserIp(request: Request): string {
    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor) {
      return Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : forwardedFor.split(',')[0];
    }

    return request.socket.remoteAddress;
  }
}

import { Module } from '@nestjs/common';
import { UrlService } from './services/url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Transition } from './entities/transition.entity';
import { TransitionsService } from './services/transitions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url, Transition])],
  controllers: [UrlController],
  providers: [UrlService, TransitionsService],
  exports: [UrlService],
})
export class UrlModule {}

import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service.js';
import { MatchesController } from './matches.controller.js';

@Module({
  providers: [MatchesService],
  controllers: [MatchesController]
})
export class MatchesModule {}

import {Module} from '@nestjs/common';
import {MatchesService} from './matches.service.js';
import {MatchesController} from './matches.controller.js';
import {ReportsModule} from "../reports/reports.module.js";

@Module({
  imports: [ReportsModule],
  providers: [MatchesService],
  controllers: [MatchesController]
})
export class MatchesModule {}

import {Module} from '@nestjs/common';
import {ReportsController} from './reports.controller.js';
import {ReportsService} from './reports.service.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReportEntity} from "./entity/report.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}

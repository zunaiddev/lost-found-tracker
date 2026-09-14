import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {UserEntity} from "../users/entity/user.entity.js";
import {ReportsService} from "./reports.service.js";
import {ReportResDto} from "./dto/report-res-dto.js";
import {ReportDto} from "./dto/report.dto.js";
import {CreateReportReqDto} from "./dto/create-report-req.dto.js";

@Controller('reports')
export class ReportsController {

    constructor(private readonly reportService: ReportsService) {
    }

    @Post()
    async saveReport(@CurrentUser() currentUser: UserEntity, @Body() reportAddReq: CreateReportReqDto): Promise<ReportDto> {
        return await this.reportService.saveReport(currentUser, reportAddReq);
    }

    @Get()
    async getReports(@CurrentUser() currentUser: UserEntity): Promise<ReportResDto> {
        return await this.reportService.getAllReportsByUser(currentUser);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteReport(@Param('id') id: number, @CurrentUser() user: UserEntity): Promise<void> {
        await this.reportService.deleteReport(id, user);
    }
}
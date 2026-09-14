import {Injectable, Param} from '@nestjs/common';
import {Repository} from "typeorm";
import {ReportEntity} from "./entity/report.entity.js";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../users/entity/user.entity.js";
import {ReportResDto} from "./dto/report-res-dto.js";
import {CreateReportReqDto} from "./dto/create-report-req.dto.js";
import {ReportDto} from "./dto/report.dto.js";
import {CurrentUser} from "../common/decorators/current-user.decorator.js";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(ReportEntity) private readonly reportRepo: Repository<ReportEntity>) {
    }

    async getAllReports(currentUser: UserEntity): Promise<ReportResDto> {
        const reports: ReportEntity[] = await this.reportRepo.findBy({
            user: {id: currentUser.id},
        });
        console.log(reports);
        return new ReportResDto(currentUser, reports);
    }

    async saveReport(currentUser: UserEntity, reportAddReq: CreateReportReqDto): Promise<ReportDto> {
        const report = new ReportEntity();
        report.user = currentUser;
        report.title = reportAddReq.title;
        report.description = reportAddReq.description;
        report.type = reportAddReq.type;
        report.category = reportAddReq.category;
        report.location = reportAddReq.location;
        report.date = reportAddReq.date;
        report.imageUrl = reportAddReq.imageUrl;

        const savedReport = await this.reportRepo.save(report);
        return new ReportDto(savedReport);
    }

    async deleteReport(@Param('id') id: number, @CurrentUser() user: UserEntity): Promise<void> {
        await this.reportRepo.delete({id: id, user: {id: user.id}});
    }
}
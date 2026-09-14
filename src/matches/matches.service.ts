import {Injectable} from '@nestjs/common';
import {ReportDto} from "../reports/dto/report.dto.js";
import {ReportsService} from "../reports/reports.service.js";
import {ReportEntity} from "../reports/entity/report.entity.js";
import {UserEntity} from "../users/entity/user.entity.js";

@Injectable()
export class MatchesService {
    constructor(private readonly reportService: ReportsService) {

    }

    async findMatches(id: number, user: UserEntity): Promise<ReportDto[]> {
        const report: ReportEntity = await this.reportService.findReportByIdAndUser(id, user);
        const reports: ReportEntity[] = await this.reportService.findAllReports();

        const {title, category, type, location} = report;

        const matches: ReportEntity[] = reports.filter(item => {
            if (item.id === report.id) return false;
            if (item.type === type) return false;

            // 3. Match against title, category, or location
            const matchesTitle = item.title.toLowerCase().includes(title.toLowerCase()) ||
                title.toLowerCase().includes(item.title.toLowerCase());

            const matchesCategory = Boolean(
                category && item.category &&
                category.toLowerCase() === item.category.toLowerCase()
            );

            const matchesLocation = item.location.toLowerCase().includes(location.toLowerCase()) ||
                location.toLowerCase().includes(item.location.toLowerCase());

            return matchesTitle || matchesCategory || matchesLocation;
        });

        return matches.map(match => new ReportDto(match));
    }
}

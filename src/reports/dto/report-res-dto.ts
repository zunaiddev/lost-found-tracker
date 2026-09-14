import {UserProfileDto} from "../../users/dto/user-profile.dto.js";
import {ReportDto} from "./report.dto.js";
import {UserEntity} from "../../users/entity/user.entity.js";
import {ReportEntity} from "../entity/report.entity.js";

export class ReportResDto {
    user: UserProfileDto;
    reports: ReportDto[];

    constructor(user: UserEntity, reports: ReportEntity[]) {
        this.user = new UserProfileDto(user);
        this.reports = reports.map(report => new ReportDto(report));
    }
}
import {Controller, Get} from '@nestjs/common';
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {UserEntity} from "../users/entity/user.entity.js";

@Controller('reports')
export class ReportsController {
    @Get()
    async getReports(@CurrentUser() currentUser: UserEntity): Promise<void> {
    }
}
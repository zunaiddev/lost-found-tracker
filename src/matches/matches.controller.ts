import {Controller, Get, Param} from '@nestjs/common';
import {ReportDto} from "../reports/dto/report.dto.js";
import {MatchesService} from "./matches.service.js";
import {UserEntity} from "../users/entity/user.entity.js";
import {CurrentUser} from "../common/decorators/current-user.decorator.js";

@Controller('matches')
export class MatchesController {

    constructor(private readonly matchesService: MatchesService) {
    }

    @Get(':id')
    async findMatches(@Param('id') id: number, @CurrentUser() user: UserEntity): Promise<ReportDto[]> {
        return await this.matchesService.findMatches(id, user);
    }
}
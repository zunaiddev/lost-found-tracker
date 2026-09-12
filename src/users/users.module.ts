import {Module} from '@nestjs/common';
import {UsersController} from './users.controller.js';
import {UsersService} from './users.service.js';
import {TypeOrmModule} from "@nestjs/typeorm";
import UserEntity from "./entity/user.entity.js";
import ReportEntity from "../reports/entity/report.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ReportEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

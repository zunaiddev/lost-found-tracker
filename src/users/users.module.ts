import {Module} from '@nestjs/common';
import {UsersController} from './users.controller.js';
import {UsersService} from './users.service.js';
import {UserEntity} from "./entity/user.entity.js";
import {ReportEntity} from "../reports/entity/report.entity.js";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ReportEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

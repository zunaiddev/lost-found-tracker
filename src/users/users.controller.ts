import {Body, Controller, Delete, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {UserEntity} from "./entity/user.entity.js";
import {UserProfileDto} from "./dto/user-profile.dto.js";
import {UsersService} from "./users.service.js";
import {UserDeleteReqDto} from "./dto/user-delete-req.dto.js";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Get('/profile')
    getUser(@CurrentUser() currentUser: UserEntity): UserProfileDto {
        return new UserProfileDto(currentUser);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    async deleteUser(@CurrentUser() currentUser: UserEntity, @Body() userDelReq: UserDeleteReqDto): Promise<void> {
        await this.usersService.deleteUser(currentUser, userDelReq);
    }
}
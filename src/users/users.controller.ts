import {Controller, Get, UseGuards} from '@nestjs/common';
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {UserEntity} from "./entity/user.entity.js";
import {JwtGuard} from "../common/guards/jwt.guard.js";

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {

    @Get('/profile')
    async getUser(@CurrentUser() currentUser: UserEntity): Promise<UserEntity> {
        return currentUser;
    }
}

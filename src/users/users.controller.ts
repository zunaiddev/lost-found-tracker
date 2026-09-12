import {Controller, Get} from '@nestjs/common';
import {CurrentUser} from "../common/decorators/current-user.decorator.js";
import {UserEntity} from "./entity/user.entity.js";

@Controller('users')
export class UsersController {

    @Get('/profile')
    async getUser(@CurrentUser() currentUser: UserEntity): Promise<UserEntity> {
        return currentUser;
    }
}
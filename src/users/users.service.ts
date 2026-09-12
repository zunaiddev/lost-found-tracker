import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import UserEntity from "./entity/user.entity.js";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
    }

    async save(name:string, email:string, password:string): Promise<UserEntity> {
        const user:UserEntity = this.userRepo.create({name, email, password});

       return await this.userRepo.save(user);
    }
}
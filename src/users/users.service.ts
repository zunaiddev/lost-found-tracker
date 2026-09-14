import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Repository} from "typeorm";
import {UserEntity} from "./entity/user.entity.js";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDeleteReqDto} from "./dto/user-delete-req.dto.js";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
    }

    async save(name:string, email:string, password:string): Promise<UserEntity> {
        if (await this.existsByEmail(email)) {
            throw new ConflictException(`user with email ${email} already exists`);
        }

        const user:UserEntity = this.userRepo.create({name, email, password});

       return await this.userRepo.save(user);
    }

    async update(user: UserEntity): Promise<UserEntity> {
        return await this.update(user);
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.userRepo.exists({where: {email}});
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepo.findOne({where: {email}});
    }

    async findById(userId: number): Promise<UserEntity | null> {
        return await this.userRepo.findOneBy({id: userId});
    }

    async deleteUser(currentUser: UserEntity, userDelReq: UserDeleteReqDto): Promise<void> {
        if (currentUser.password !== userDelReq.password) {
            throw new UnauthorizedException('Invalid password');
        }

        await this.userRepo.delete({id: currentUser.id});
    }
}
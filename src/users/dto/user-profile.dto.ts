import {UserEntity} from "../entity/user.entity.js";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class UserProfileDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
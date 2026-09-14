import {IsNotEmpty, IsString} from "class-validator";

export class UserDeleteReqDto {
    @IsNotEmpty({message: "password is required"})
    @IsString({message: "password must be a valid string"})
    public readonly password: string;
}
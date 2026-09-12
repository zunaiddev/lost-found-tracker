import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginReqDto} from "./dto/login-req.dto.js";
import {AuthResDto} from "./dto/auth-res.dto.js";
import {SignupReqDto} from "./dto/signup-req.dto.js";
import {UserEntity} from "../users/entity/user.entity.js";
import {UsersService} from "../users/users.service.js";
import {JwtService} from "../jwt/jwt.service.js";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
    }

    async signup({name, email, password}: SignupReqDto): Promise<AuthResDto> {
        const user: UserEntity = await this.userService.save(name, email, password);

        const accessToken: string = this.jwtService.generateToken(String(user.id), "AUTH");

        return new AuthResDto({id: user.id, name, email, accessToken});
    }

    async login({email, password}: LoginReqDto): Promise<AuthResDto> {
        const user: UserEntity | null = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException(`user with ${email} not found`);
        }

        if (user.password !== password) {
            throw new UnauthorizedException("Invalid password");
        }

        const accessToken: string = this.jwtService.generateToken(String(user.id), "AUTH");

        return new AuthResDto({id: user.id, name: user.name, email: user.email, accessToken});
    }
}
import {Body, Controller, Post} from '@nestjs/common';
import {AuthResDto} from "./dto/auth-res.dto.js";
import {SignupReqDto} from "./dto/signup-req.dto.js";
import {LoginReqDto} from "./dto/login-req.dto.js";
import {AuthService} from "./auth.service.js";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    signup(@Body() signupReq: SignupReqDto): AuthResDto {
        return this.authService.signup(signupReq);
    }

    @Post('/login')
    login(@Body() loginReq: LoginReqDto): AuthResDto {
        return this.authService.login(loginReq);
    }
}

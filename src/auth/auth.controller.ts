import {Body, Controller, Post} from '@nestjs/common';
import {AuthResDto} from "./dto/auth-res.dto.js";
import {SignupReqDto} from "./dto/signup-req.dto.js";
import {LoginReqDto} from "./dto/login-req.dto.js";
import {AuthService} from "./auth.service.js";
import {Public} from "../common/decorators/public.decorator.js";

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/signup')
    async signup(@Body() signupReq: SignupReqDto): Promise<AuthResDto> {
        return await this.authService.signup(signupReq);
    }

    @Post('/login')
    async login(@Body() loginReq: LoginReqDto): Promise<AuthResDto> {
        return await this.authService.login(loginReq);
    }
}

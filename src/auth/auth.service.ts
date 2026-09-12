import {Injectable} from '@nestjs/common';
import {LoginReqDto} from "./dto/login-req.dto.js";
import {AuthResDto} from "./dto/auth-res.dto.js";
import {SignupReqDto} from "./dto/signup-req.dto.js";

@Injectable()
export class AuthService {

    signup(signupReq: SignupReqDto):AuthResDto{
        return new AuthResDto({id: 1, name: signupReq.name, email: signupReq.email, accessToken: 'access-token'});
    }

    login(loginReq: LoginReqDto): AuthResDto {
        return new AuthResDto({id: 1, name: 'John', email: loginReq.email, accessToken: 'access-token'});
    }
}

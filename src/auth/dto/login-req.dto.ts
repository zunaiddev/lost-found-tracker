import {IsEmail, IsNotEmpty, IsString,} from 'class-validator';

export class LoginReqDto {
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @IsString({message: 'password must be a an string' })
  password: string;
}
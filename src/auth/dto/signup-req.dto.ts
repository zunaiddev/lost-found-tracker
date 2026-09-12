import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class SignupReqDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  @Matches(/^[a-zA-Z\s]{3,30}$/, {
    message:
      'name must contain only letters and be between 3 and 30 characters long',
  })
  name: string;

  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    },
  )
  password: string;
}

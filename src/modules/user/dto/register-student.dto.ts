import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterStudentDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fname: string;

  @IsNotEmpty()
  @IsString()
  lname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

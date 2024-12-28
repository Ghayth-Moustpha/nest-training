import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
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

  @IsString()
  Bio: string ; 

  @IsString()
  image: string ; 
  
  @IsOptional()
  @IsString () 
  title : string ;
  

}
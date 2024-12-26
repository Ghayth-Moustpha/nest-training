import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  id? : string  

  @IsEmail()
  email?: string;



 
}
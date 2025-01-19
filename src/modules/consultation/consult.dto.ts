import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class ConsultDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;
    @IsOptional()
    @IsString() // Uncomment if you want to validate date as well
    message?: string; 

    @IsDate() // Uncomment if you want to validate date as well
    date: Date; 
}

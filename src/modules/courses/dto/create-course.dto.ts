import { IsString, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  teacherId: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @ArrayNotEmpty()
  categories: number[];
}

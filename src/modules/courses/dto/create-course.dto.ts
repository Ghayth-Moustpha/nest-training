import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express'; // Import Express for file types

export class CreateCourseDto {
  @ApiProperty({ description: 'The title of the course' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'A brief description of the course' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The ID of the teacher who is teaching the course' })
  teacherId: number;

  @ApiProperty({ description: 'The URL of the image for the course', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Optional image URL

  @ApiProperty({ description: 'The course image file', type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: Express.Multer.File; // Correct type for uploaded image file
}

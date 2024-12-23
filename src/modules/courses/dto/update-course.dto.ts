import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express'; // Import Express for file types

export class UpdateCourseDto {
  @ApiProperty({ description: 'The title of the course', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'A brief description of the course', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The ID of the teacher who is teaching the course', required: false })
  @IsOptional()
  teacherId?: number;

  @ApiProperty({ description: 'The URL of the image for the course', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Optional image URL

  @ApiProperty({ description: 'The course image file', type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: Express.Multer.File; // Correct type for uploaded image file
}

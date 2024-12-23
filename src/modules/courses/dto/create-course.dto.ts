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


  @ApiProperty({ description: 'The course image file', type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: Express.Multer.File; // Correct type for uploaded image file 


  @ApiProperty({ description: 'The Cost in dollar' })
  @IsOptional()
  cost: number ;
}

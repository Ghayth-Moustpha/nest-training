import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({
    description: 'The unique identifier for the course',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'A brief description of the course',
    example: 'Learn how to build scalable APIs using NestJS.',
  })
  description: string;

  @ApiProperty({
    description: 'The ID of the teacher teaching the course',
    example: 123,
  })
  teacherId: number;

  @ApiProperty({
    description: 'The name of the teacher',
    example: 'John Doe',
  })
  teacherName: string;

  @ApiProperty({
    description: 'The URL of the course image (if available)',
    example: 'files/unique-image-name.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'The creation date of the course',
    example: '2024-12-23T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the course',
    example: '2024-12-23T12:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'The Cost in dollar' })
  cost: number ;
  
}

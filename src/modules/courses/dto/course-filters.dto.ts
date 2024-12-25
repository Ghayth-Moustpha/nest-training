import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';

export class CourseFiltersDto {
  @IsOptional()
  @IsNumber()
  categoryId?: number; // Filter by a specific category

  @IsOptional()
  @IsNumber()
  teacherId?: number; // Filter by a specific teacher

  @IsOptional()
  @IsNumber()
  @Min(0)
  minCost?: number; // Minimum cost of the course

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxCost?: number; // Maximum cost of the course

  @IsOptional()
  @IsString()
  type?: string; // Course type (e.g., Online, In-person, Hybrid)

  @IsOptional()
  @IsString()
  title?: string; // Search for courses by title (partial match)
}

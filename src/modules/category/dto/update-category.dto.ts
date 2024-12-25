import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  imageURL?: string;
}

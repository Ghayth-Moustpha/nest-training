import { IsString, IsNotEmpty, IsInt, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  imageURL: string;

  @IsInt()
  @IsNotEmpty()
  adminId: number;
}

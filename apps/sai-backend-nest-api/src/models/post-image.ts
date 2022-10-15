import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostImage {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  postId?: string;

  @IsNotEmpty()
  @IsString()
  imageURL: string;
}

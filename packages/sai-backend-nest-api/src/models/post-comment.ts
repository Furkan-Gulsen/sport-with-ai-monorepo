import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostComment {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  commentUserId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsOptional()
  @IsArray()
  usersWhoLike: string[];
}

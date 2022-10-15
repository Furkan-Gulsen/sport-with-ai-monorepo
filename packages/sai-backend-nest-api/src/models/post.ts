import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { PostComment } from './post-comment';
import { PostImage } from './post-image';
import { Pool } from './post-pool';

export class PostI {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  content: string;

  @IsOptional()
  @IsString()
  postType?: string; // text | image | pool

  @IsOptional()
  @IsArray()
  usersWhoLike: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PostImage)
  postImage?: PostImage;

  @IsOptional()
  @ValidateNested()
  @Type(() => Pool)
  pool?: Pool;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostComment)
  postComments?: PostComment[];
}

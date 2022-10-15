import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Pool {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(3)
  @ArrayMinSize(3)
  options: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3)
  @ArrayMinSize(3)
  statistics?: Number[];

  @IsOptional()
  @IsString()
  postId?: string;
}

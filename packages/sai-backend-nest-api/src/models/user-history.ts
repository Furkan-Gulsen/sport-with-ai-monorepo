import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from '.';

export class UserHistory {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;

  // @IsNotEmpty()
  // @IsNumber()
  // numberOfStep: number;

  @IsNotEmpty()
  @IsNumber()
  activityCalorie: number;

  // @ValidateNested()
  // @IsObject()User
  // @Type(() => User)
  // user: UserDto;
}

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Activity {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  imageURL: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfRepetitions: number;

  @IsNotEmpty()
  @IsBoolean()
  isAI: boolean;

  @IsOptional()
  @IsNumber()
  calorie?: number;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ActivityDay)
  // activityDays?: ActivityDay[];
}

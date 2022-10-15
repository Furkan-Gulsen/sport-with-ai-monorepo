import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class ActivityDay {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsOptional()
  @IsString()
  workoutId: string;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => Workout)
  // workout?: Workout;

  @IsOptional()
  @IsNumber()
  day: number;

  @IsOptional()
  @IsArray()
  activiteIDs?: string[];

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => Activity)
  // activities?: Activity[];
}

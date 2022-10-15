import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ActivityDay } from './activity-day';
import { UserActivity } from './user-activity';

export class Workout {
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
  kind: string;

  @IsNotEmpty()
  @IsString()
  imageURL: string;

  @IsNotEmpty()
  @IsString()
  information: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ActivityDay)
  activityDays?: ActivityDay[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UserActivity)
  userActivities?: UserActivity[];
}

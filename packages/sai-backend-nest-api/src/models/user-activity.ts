import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserActivity {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsNotEmpty()
  @IsString()
  userId: string;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => User)
  // user?: User;

  @IsNotEmpty()
  @IsString()
  activityDayId: string;

  @IsOptional()
  @IsNumber()
  activityCalorie?: number;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ActivityDay)
  // activityDay?: ActivityDay;
}

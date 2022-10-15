import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { PrivacyPolicy } from './privacy-policy';

export class SaiApp {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  version: number;

  @IsNotEmpty()
  @IsString()
  versionName: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  isActivity: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => PrivacyPolicy)
  privacyPolicy?: PrivacyPolicy;
}

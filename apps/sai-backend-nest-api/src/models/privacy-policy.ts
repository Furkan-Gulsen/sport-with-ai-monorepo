import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class PrivacyPolicy {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  creationDate?: Date;

  @IsNotEmpty()
  @IsString()
  app_id: string;
}

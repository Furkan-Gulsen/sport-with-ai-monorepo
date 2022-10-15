import { ApiProperty } from '@nestjs/swagger';
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

export class PersonalInformation {
  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({ required: true, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({ required: true, type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  // @ApiProperty({ required: true, type: Date })
  // @IsNotEmpty()
  // @Type(() => Date)
  // @IsDate()
  // birthDay: Date;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  birthDay: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  goal: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  gender: string;
}

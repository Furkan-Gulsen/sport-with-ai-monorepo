import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenData {
  @ApiProperty({ required: false, type: 'string' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

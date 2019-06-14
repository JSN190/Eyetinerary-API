import { IsAscii, IsPositive, IsDefined, IsOptional, MaxLength, Length } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateItemDto {
  @IsDefined()
  @IsAscii()
  @MaxLength(140)
  readonly title: string;

  @IsDefined()
  @IsAscii()
  @MaxLength(1000)
  readonly body: string;

  @IsDefined()
  @IsPositive()
  readonly page: number;

  @IsDefined()
  readonly timeStart: string | number;

  @Optional()
  readonly timeEnd: string | number;

  @IsOptional()
  @IsAscii()
  @Length(140, 140)
  readonly editToken: string;
}

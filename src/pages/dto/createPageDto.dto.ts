import { IsDefined, IsAscii, IsPositive, IsOptional, MaxLength, Length } from 'class-validator';

export class CreatePageDto {
  @IsDefined()
  @IsAscii()
  @MaxLength(100)
  readonly title: string;

  @IsPositive()
  readonly itinerary: number;

  @IsOptional()
  @IsAscii()
  @Length(140, 140)
  readonly editToken: string;
}

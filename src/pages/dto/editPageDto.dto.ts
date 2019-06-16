import {
  IsAscii,
  IsOptional,
  MaxLength,
  Length,
  IsPositive,
} from 'class-validator';

export class EditPageDto {
  @IsOptional()
  @IsAscii()
  @MaxLength(100)
  readonly title: string;

  @IsOptional()
  @IsPositive()
  readonly rankInItinerary: number;

  @IsOptional()
  @IsAscii()
  @Length(140, 140)
  readonly editToken: string;
}

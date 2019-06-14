import { IsDefined, IsAscii, IsOptional, MaxLength, Length } from 'class-validator';

export class EditItineraryDto {
  @IsDefined()
  @IsAscii()
  @MaxLength(100)
  readonly title: string;

  @IsOptional()
  @IsAscii()
  @Length(140)
  readonly editToken: string;
}

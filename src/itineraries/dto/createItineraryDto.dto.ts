import { IsDefined, IsAscii, MaxLength } from 'class-validator';

export class CreateItineraryDto {
  @IsDefined()
  @IsAscii()
  @MaxLength(100)
  readonly title: string;
}

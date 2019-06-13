import { IsDefined, IsAscii, IsOptional } from 'class-validator';

export class EditItineraryDto {
  @IsDefined()
  @IsAscii()
  readonly title: string;

  @IsOptional()
  @IsAscii()
  readonly editToken: string;
}

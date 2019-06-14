import { IsAscii, IsOptional, Length } from 'class-validator';

export class DeleteItineraryDto {
  @IsOptional()
  @IsAscii()
  @Length(140, 140)
  readonly editToken: string;
}

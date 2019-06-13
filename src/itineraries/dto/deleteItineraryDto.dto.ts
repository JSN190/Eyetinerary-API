import { IsAscii, IsOptional } from 'class-validator';

export class DeleteItineraryDto {
  @IsOptional()
  @IsAscii()
  readonly editToken: string;
}

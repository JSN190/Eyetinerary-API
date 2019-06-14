import { IsDefined, IsAscii, IsPositive, IsOptional } from 'class-validator';

export class CreatePageDto {
  @IsDefined()
  @IsAscii()
  readonly title: string;

  @IsPositive()
  readonly itinerary: number;

  @IsOptional()
  @IsAscii()
  readonly editToken: string;
}

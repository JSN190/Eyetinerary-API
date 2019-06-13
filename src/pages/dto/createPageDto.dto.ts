import { IsDefined, IsAscii, IsPositive } from 'class-validator';

export class CreatePageDto {
  @IsDefined()
  @IsAscii()
  readonly title: string;

  @IsPositive()
  readonly itinerary: number;
}

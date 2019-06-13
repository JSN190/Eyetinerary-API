import { IsDefined, IsAscii } from 'class-validator';

export class CreateItineraryDto {
  @IsDefined()
  @IsAscii()
  readonly title: string;
}

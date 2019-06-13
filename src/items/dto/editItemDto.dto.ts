import { IsDefined, IsAscii, IsOptional } from 'class-validator';

export class EditItemDto {
  @IsOptional()
  @IsAscii()
  readonly title: string;

  @IsOptional()
  @IsAscii()
  readonly body: string;

  @IsOptional()
  @IsAscii()
  readonly editToken: string;
}

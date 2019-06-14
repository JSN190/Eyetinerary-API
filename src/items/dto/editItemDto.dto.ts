import { IsAscii, IsOptional, MaxLength, Length } from 'class-validator';

export class EditItemDto {
  @IsOptional()
  @IsAscii()
  @MaxLength(100)
  readonly title: string;

  @IsOptional()
  @IsAscii()
  @MaxLength(1000)
  readonly body: string;

  @IsOptional()
  @IsAscii()
  @Length(140)
  readonly editToken: string;
}

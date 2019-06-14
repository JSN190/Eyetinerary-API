import { IsOptional, IsAscii, Length } from 'class-validator';

export class DeletePageDto {
  @IsOptional()
  @IsAscii()
  @Length(140, 140)
  readonly editToken: string;
}

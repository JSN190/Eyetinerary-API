import { IsOptional, IsAscii, Length } from 'class-validator';

export class DeleteItemDto {
  @IsOptional()
  @IsAscii()
  @Length(140)
  readonly editToken: string;
}

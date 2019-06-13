import { IsOptional, IsAscii } from 'class-validator';

export class DeletePageDto {
  @IsOptional()
  @IsAscii()
  readonly editToken: string;
}

import { IsOptional, IsAscii } from 'class-validator';

export class DeleteItemDto {
  @IsOptional()
  @IsAscii()
  readonly editToken: string;
}

import { IsDefined, IsAscii } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsAscii()
  readonly username: string;

  @IsDefined()
  @IsAscii()
  readonly password: string;
}

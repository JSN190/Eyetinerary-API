import {
  IsDefined,
  IsAlphanumeric,
  IsAscii,
  IsEmail,
  IsOptional,
  IsAlpha,
  Length,
} from 'class-validator';

export class RegisterUserDto {
  @IsDefined()
  @IsAlphanumeric()
  readonly username: string;

  @IsDefined()
  @IsAscii()
  readonly password: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsAscii()
  readonly location: string;

  @IsOptional()
  @IsAlpha()
  @Length(2, 2)
  readonly countryCode: string;
}

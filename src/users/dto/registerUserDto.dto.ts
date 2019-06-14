import {
  IsDefined,
  IsAlphanumeric,
  IsAscii,
  IsEmail,
  IsOptional,
  IsAlpha,
  Length,
  MaxLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsDefined()
  @IsAlphanumeric()
  @MaxLength(50)
  readonly username: string;

  @IsDefined()
  @IsAscii()
  @Length(8, 72)
  readonly password: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(140)
  readonly email: string;

  @IsOptional()
  @IsAscii()
  @MaxLength(75)
  readonly location: string;

  @IsOptional()
  @IsAlpha()
  @Length(2, 2)
  readonly countryCode: string;
}

import {
  IsAscii,
  IsDefined,
  IsAlphanumeric,
  IsPositive,
} from 'class-validator';

export class JwtPayloadDto {
  @IsDefined()
  @IsPositive()
  readonly id: number;
}

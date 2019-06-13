import { IsOptional, IsBoolean } from 'class-validator';

export class DeleteUserDto {
  @IsOptional()
  @IsBoolean()
  readonly deleteItineraries: boolean;
}

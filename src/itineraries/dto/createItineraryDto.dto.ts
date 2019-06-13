import { IsDefined, IsAscii, IsPositive } from "class-validator";

export class CreateItineraryDto {
    @IsDefined()
    @IsAscii()
    readonly title: string;

    @IsPositive()
    readonly owner: number;
}

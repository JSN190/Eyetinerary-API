import {IsAscii, IsNumber, IsPositive, IsDefined} from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateItemDto {
    @IsDefined()
    @IsAscii()
    readonly title: string;

    @IsDefined()
    @IsAscii()
    readonly body: string;

    @IsDefined()
    @IsPositive()
    readonly page: number;

    @IsDefined()
    readonly timeStart: string | number;

    @Optional()
    readonly timeEnd: string | number;
}

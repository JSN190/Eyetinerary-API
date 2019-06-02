export class CreateItemDto {
    readonly title: string;
    readonly body: string;
    readonly page: number;
    readonly timeStart: string | number;
    readonly timeEnd: string | number;
}

import { User } from '../../users/user.entity';

export class CreateItineraryDto {
    readonly title: string;
    readonly owner: User;
}

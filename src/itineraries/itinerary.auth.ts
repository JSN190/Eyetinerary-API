import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { User } from '../users/user.entity';
import { AuthService } from '../auth/auth.service';
import { Itinerary } from './itinerary.entity';

@Injectable()
export class IntineraryAuth {
    constructor(
        private readonly itineraryService: ItineraryService,
        private readonly authService: AuthService,
    ) {}

    async verifyEditToken(editToken: string, itinerary: Itinerary) {
        const storedToken = await this.itineraryService.getEditToken(itinerary.id);
        if (editToken !== storedToken) {
            throw new UnauthorizedException('Invalid Edit Token', 'Invalid Edit Token');
        }
    }

    async verifyOwnership(token: string, itinerary: Itinerary) {
        const user: User = await this.authService.authenticateByJwt(token);
        if (!user ) {
            throw new UnauthorizedException('Invalid Token', 'Invalid Token');
        } else if (user.id !== itinerary.owner.id) {
            throw new UnauthorizedException(
            `${user.username} does not have permission to edit itinerary ${itinerary.id}`, 'Unauthorised');
        }
    }
}

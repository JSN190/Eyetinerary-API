import { Connection } from 'typeorm';
import { Itinerary } from './itinerary.entity';

export const itineraryProviders = [
    {
        provide: 'ITINERARY_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Itinerary),
        inject: ['DATABASE_CONNECTION'],
    },
];

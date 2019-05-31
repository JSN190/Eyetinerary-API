import { createConnection } from 'typeorm';

export const dbProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'eyetinerary',
            password: 'eyetinerary',
            database: 'eyetinerary',
            synchronize: true,
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
        }),
    },
];

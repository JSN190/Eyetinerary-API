import { createConnection, Connection } from 'typeorm';

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
    {
        provide: 'ENTITY_MANAGER',
        useFactory: (connection: Connection) => connection.manager,
        inject: ['DATABASE_CONNECTION'],
    },
];

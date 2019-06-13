import { createConnection, Connection } from 'typeorm';

export const dbProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: process.env.EYET_PGHOST,
            port: Number(process.env.EYET_PGPORT),
            username: process.env.EYET_PGUSERNAME,
            password: process.env.EYET_PGPASSWORD,
            database: process.env.EYET_PGDATABASE,
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

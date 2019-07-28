import { createConnection, Connection } from 'typeorm';
import DatabaseConfig from '../db.config';

export const dbProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection(DatabaseConfig),
  },
  {
    provide: 'ENTITY_MANAGER',
    useFactory: (connection: Connection) => connection.manager,
    inject: ['DATABASE_CONNECTION'],
  },
];

import { Connection } from 'typeorm';
import { Page } from './page.entity';

export const pageProviders = [
  {
    provide: 'PAGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Page),
    inject: ['DATABASE_CONNECTION'],
  },
];

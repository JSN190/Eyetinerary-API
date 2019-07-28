import { config } from 'dotenv';
import { ConnectionOptions } from 'typeorm';
config();

const DatabaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.EYET_PGHOST,
  port: Number(process.env.EYET_PGPORT),
  username: process.env.EYET_PGUSERNAME,
  password: process.env.EYET_PGPASSWORD,
  database: process.env.EYET_PGDATABASE,
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default DatabaseConfig;

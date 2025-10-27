import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'barberconnect',
  entities: ['src/db/entities/*.ts'],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
});

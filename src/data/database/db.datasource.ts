import { User } from './entity/user.entity';
import { DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'proyecto',
  entities: [User],
  synchronize: true,
};

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/database/user.entity';

export const DbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'proyecto',
  entities: [User],
  synchronize: true,
});

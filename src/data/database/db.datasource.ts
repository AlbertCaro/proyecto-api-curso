import { Curso } from './entity/course.entity';
import { Inscripcion } from './entity/inscription.entity';
import { Pago } from './entity/payment.entity';
import { Usuario } from './entity/user.entity';
import { DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'proyecto',
  entities: [Usuario, Inscripcion, Curso, Pago],
  synchronize: true,
};

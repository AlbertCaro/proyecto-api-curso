import { Curso } from './entity/course.entity';
import { Enrollment } from './entity/enrollment.entity';
import { Pago } from './entity/payment.entity';
import { Comprobante } from './entity/receipt.entity';
import { Usuario } from './entity/user.entity';
import { DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'proyecto',
  entities: [Usuario, Enrollment, Curso, Pago, Comprobante],
  synchronize: true,
};

import { Usuario as Entity } from '../../data/database/entity/user.entity';
import { UserReadDto } from '../../infraestructure/user/dto/user-read.dto';
import { Role } from './role.enum';

export class User {
  id?: number;

  names: string;

  lastName: string;

  email: string;

  password: string;

  role: Role;

  code: number;

  toDatabase() {
    const entity = new Entity();

    entity.id = this.id;
    entity.nombres = this.names;
    entity.apellidos = this.lastName;
    entity.correo = this.email;
    entity.password = this.password;
    entity.rol = this.role;
    entity.codigo = this.code;

    return entity;
  }

  toReadDto() {
    const dto = new UserReadDto();

    dto.id = this.id;
    dto.names = this.names;
    dto.lastName = this.lastName;
    dto.email = this.email;
    dto.role = this.role;
    dto.code = this.code;

    return dto;
  }
}

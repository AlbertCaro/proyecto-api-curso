import { User as Entity } from '../../data/database/entity/user.entity';
import { UserReadDto } from '../../infraestructure/user/dto/user-read.dto';

export class User {
  id?: number;

  nombres: string;

  apellidos: string;

  correo: string;

  password: string;

  toDatabase() {
    const entity = new Entity();
    entity.id = this.id;
    entity.nombres = this.nombres;
    entity.apellidos = this.apellidos;
    entity.correo = this.correo;
    entity.password = this.password;

    return entity;
  }

  toReadDto() {
    const dto = new UserReadDto();
    dto.id = this.id;
    dto.nombres = this.nombres;
    dto.apellidos = this.apellidos;
    dto.correo = this.correo;

    return dto;
  }
}

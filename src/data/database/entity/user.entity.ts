import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { User as UserModel } from '../../../domain/models/user.model';
import { type } from 'node:os';
import { Role } from '../../../domain/models/role.enum';

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
  })
  rol: Role;

  @Column()
  codigo: number;

  toDomain() {
    const user = new UserModel();

    user.id = this.id;
    user.names = this.nombres;
    user.lastName = this.apellidos;
    user.email = this.correo;
    user.password = this.password;
    user.role = this.rol;
    user.code = this.codigo;

    return user;
  }
}

import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { User as UserModel } from '../../../domain/models/user.model';

@Entity()
export class User extends BaseEntity {
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

  toDomain() {
    const user = new UserModel();

    user.id = this.id;
    user.nombres = this.nombres;
    user.apellidos = this.apellidos;
    user.correo = this.correo;

    return user;
  }
}

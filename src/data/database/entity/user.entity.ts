import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { User as UserModel } from '../../../domain/models/user.model';
import { Role } from '../../../domain/models/role.enum';
import { Inscripcion } from './inscription.entity';
import { Curso } from './course.entity';

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
  })
  nombres: string;

  @Column({
    nullable: false,
  })
  apellidos: string;

  @Column({
    unique: true,
    nullable: false,
  })
  correo: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT, 
  })
  rol: Role;

  @Column({
    unique: true,
    type: 'int',
    nullable: false,
  })
  codigo: number;

  @OneToMany(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.alumno)
  inscripciones: Inscripcion[];

  @OneToMany(() => Curso, (curso: Curso) => curso.coordinador)
  cursosCoordinados: Curso[];

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

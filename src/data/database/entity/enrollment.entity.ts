import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./course.entity";
import { Usuario } from "./user.entity";
import { Pago } from "./payment.entity";

@Entity()
export class Enrollment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    motivos: string;

    @Column()
    fecha: Date;

    @Column()
    precio: number;

    @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.inscripciones)
    alumno: Usuario;

    @ManyToOne(() => Curso, (curso: Curso) => curso.inscripciones)
    curso: Curso;

    @OneToMany(() => Pago, (pago: Pago) => pago.inscripcion)
    pagos: Pago[];
}
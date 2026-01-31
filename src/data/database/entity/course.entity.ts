import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "./inscription.entity";
import { Usuario } from "./user.entity";

@Entity()
export class Curso extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcionCorta: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'longtext', nullable: true })
    objetivos: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    duracion: string;

    @Column({ type: 'date', nullable: true })
    inicio: Date;

    @Column({ type: 'date', nullable: true })
    fin: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    esfuerzo: string;

    @Column({ type: 'float', precision: 10, scale: 2, nullable: true })
    costoInicio: number;

    @Column({ type: 'float', precision: 10, scale: 2, nullable: true })
    costoFin: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    tema: string;

    @Column({ name: 'nive', type: 'varchar', length: 60, nullable: true })
    nive: string;

    @Column({ type: 'int', nullable: true })
    cupo: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    pago: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    doc: string;

    @Column({ type: 'varchar', length: 45, nullable: true })
    info: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    img: string;

    @Column({ type: 'int', default: 1 })
    estatus: number;

    @OneToMany(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.curso)
    inscripciones: Inscripcion[]

    @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.cursosCoordinados)
    coordinador: Usuario;
}
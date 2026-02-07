import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "./inscription.entity";
import { Usuario } from "./user.entity";
import { Course } from "src/domain/models/course.model";

@Entity()
export class Curso extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

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

    @Column({ type: 'datetime', nullable: true })
    inicio: Date;

    @Column({ type: 'datetime', nullable: true })
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


    toDomain() {
        const model = new Course();

        model.id = this.id;
        model.name = this.nombre;
        model.shortDescription = this.descripcionCorta;
        model.description = this.descripcion;
        model.objectives = this.objetivos;
        model.duration = this.duracion;
        model.startDate = this.inicio;
        model.endDate = this.fin;
        model.effort = this.esfuerzo;
        model.initialCost = this.costoInicio;
        model.finalCost = this.costoFin;
        model.topic = this.tema;
        model.nive = this.nive;
        model.capacity = this.cupo;
        model.payment = this.pago;
        model.document = this.doc;
        model.info = this.info;
        model.image = this.img;
        model.status = this.estatus;

        model.coordinator = this.coordinador.toDomain();

        return model;
    }
}
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "./inscription.entity";

@Entity()
export class Curso extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.curso)
    inscripciones: Inscripcion[]
}
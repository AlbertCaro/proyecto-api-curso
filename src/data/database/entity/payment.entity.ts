import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "./inscription.entity";

@Entity()
export class Pago {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.pagos)
    inscripcion: Inscripcion;
}
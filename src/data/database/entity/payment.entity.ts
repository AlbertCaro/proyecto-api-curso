import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "./inscription.entity";
import { Comprobante } from "./receipt.entity";

@Entity()
export class Pago {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;
    
    @Column()
    banco: string;
    
    @Column()
    monto: number;

    @ManyToOne(() => Inscripcion, (inscripcion: Inscripcion) => inscripcion.pagos)
    inscripcion: Inscripcion;

    @OneToOne(() => Comprobante)
    comprobante: Comprobante;
}
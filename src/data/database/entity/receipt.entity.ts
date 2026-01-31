import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pago } from "./payment.entity";

@Entity()
export class Comprobante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoArchivo: string;
    
    @Column({
        type: 'blob'
    })
    contenido: Blob;

    @OneToOne(() => Pago)
    @JoinColumn()
    pago: Pago;
}
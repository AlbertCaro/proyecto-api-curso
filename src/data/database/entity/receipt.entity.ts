import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pago } from './payment.entity';
import { Receipt } from 'src/domain/models/receipt.model';

@Entity()
export class Comprobante extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreArchivo: string;

  @Column()
  tipoArchivo: string;

  @Column({
    type: 'longtext',
  })
  contenido: string;

  @OneToOne(() => Pago, (pago) => pago.comprobante)
  @JoinColumn()
  pago: Pago;

  toDomain() {
    const model = new Receipt();

    model.id = this.id;
    model.fileName = this.nombreArchivo;
    model.fileType = this.tipoArchivo;
    model.content = this.contenido;

    return model;
  }
}

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Comprobante } from './receipt.entity';
import { Payment } from 'src/domain/models/payment.model';

@Entity()
export class Pago extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  banco: string;

  @Column()
  monto: number;

  @ManyToOne(() => Enrollment, (inscripcion: Enrollment) => inscripcion.pagos)
  inscripcion: Enrollment;

  @OneToOne(() => Comprobante, (comprobante) => comprobante.pago)
  comprobante: Comprobante;

  toDomain() {
    const model = new Payment();

    model.id = this.id;
    model.date = this.fecha;
    model.bank = this.banco;
    model.amount = this.monto;

    return model;
  }
}

import { Pago } from 'src/data/database/entity/payment.entity';
import { PaymentDto } from 'src/infraestructure/payment/dto/payment.dto';

export class Payment {
  id: number;

  date: Date;

  bank: string;

  amount: number;

  toDatabase() {
    const entity = new Pago();

    entity.id = this.id;
    entity.fecha = this.date;
    entity.banco = this.bank;
    entity.monto = this.amount;

    return entity;
  }

  toDto() {
    const dto = new PaymentDto();

    dto.id = this.id;
    dto.date = this.date;
    dto.bank = this.bank;
    dto.amount = this.amount;

    return dto;
  }
}

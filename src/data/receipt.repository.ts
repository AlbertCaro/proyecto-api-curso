import { Injectable } from '@nestjs/common';
import { Comprobante } from './database/entity/receipt.entity';
import { Receipt } from 'src/domain/models/receipt.model';
import { Payment } from 'src/domain/models/payment.model';

@Injectable()
export class ReceiptRepository {
  async fetchAll() {
    const receipts = await Comprobante.find({ relations: ['coordinador'] });

    return receipts.map((Receipt) => Receipt.toDomain());
  }

  async fetchByPayment(payment: Payment) {
    const receipt = await Comprobante.findOne({
      where: { pago: { id: payment.id } },
    });

    return receipt?.toDomain();
  }

  async fetchByPaymentId(id: number) {
    const receipt = await Comprobante.findOne({
      where: { pago: { id } },
    });

    return receipt?.toDomain();
  }

  async create(receipt: Receipt) {
    const entity = receipt.toDatabase();
    console.log(entity.pago);

    await entity.save();
    await entity.reload();

    return entity.toDomain();
  }

  async delete(receipt: Receipt) {
    await receipt.toDatabase().remove();
  }
}

import { Injectable } from '@nestjs/common';
import { GetPaymentById } from './get-payment-by-id.usecase';
import { ReceiptRepository } from 'src/data/receipt.repository';
import { Payment } from 'src/domain/models/payment.model';

@Injectable()
export class GetPaymentReceipt {
  constructor(
    private readonly getPaymentById: GetPaymentById,
    private readonly repository: ReceiptRepository,
  ) {}

  async execute(payment: Payment) {
    const receipt = await this.repository.fetchByPayment(payment);

    return receipt;
  }
}

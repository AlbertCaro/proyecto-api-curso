import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "src/data/payment.repository";
import { Payment } from "src/domain/models/payment.model";

@Injectable()
export class CreatePayment {
  constructor(
    private readonly repository: PaymentRepository,
  ) {}

  async execute(payment: Payment) {
    await this.repository.create(payment);

    return payment;
  }
}

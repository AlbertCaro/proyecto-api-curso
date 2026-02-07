import { Module } from '@nestjs/common';
import { PaymentController } from 'src/infraestructure/payment/payment.controller';
import { UserModule } from './user.module';
import { CreatePayment } from 'src/domain/usecases/payment/create-payment.usecase';
import { PaymentRepository } from 'src/data/payment.repository';
import { GetAllPayments } from 'src/domain/usecases/payment/get-all-payments.usecase';
import { GetPaymentById } from 'src/domain/usecases/payment/get-payment-by-id.usecase';
import { GetPaymentReceipt } from 'src/domain/usecases/payment/get-payment-receipt.usecase';
import { ReceiptRepository } from 'src/data/receipt.repository';
import { CreateReceipt } from 'src/domain/usecases/payment/create-receipt.usecase';

@Module({
  imports: [UserModule],
  providers: [
    CreatePayment,
    GetPaymentById,
    GetPaymentReceipt,
    GetAllPayments,
    CreateReceipt,
    PaymentRepository,
    ReceiptRepository,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}

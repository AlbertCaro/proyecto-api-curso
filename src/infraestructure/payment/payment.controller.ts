import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role-guard.service';
import { Auth } from '../auth/auth.decorator';
import { Role } from 'src/domain/models/role.enum';
import { CreatePayment } from 'src/domain/usecases/payment/create-payment.usecase';
import { PaymentDto } from './dto/payment.dto';
import { GetAllPayments } from 'src/domain/usecases/payment/get-all-payments.usecase';
import { GetPaymentById } from 'src/domain/usecases/payment/get-payment-by-id.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { Receipt } from 'src/domain/models/receipt.model';
import { CreateReceipt } from 'src/domain/usecases/payment/create-receipt.usecase';
import { Response } from 'express';
import { GetPaymentReceipt } from 'src/domain/usecases/payment/get-payment-receipt.usecase';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('/payments')
@Auth(Role.ADMINISTRATOR)
export class PaymentController {
  constructor(
    private readonly createPayment: CreatePayment,
    private readonly getAllPayments: GetAllPayments,
    private readonly getPaymentById: GetPaymentById,
    private readonly createReceipt: CreateReceipt,
    private readonly getPaymentReceipt: GetPaymentReceipt,
  ) {}

  @Post()
  async create(@Body() dto: PaymentDto) {
    const payment = await this.createPayment.execute(dto.toDomain());

    return payment.toDto();
  }

  @Get()
  async getAll() {
    const payments = await this.getAllPayments.execute();

    return payments.map((payment) => payment.toDto());
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<PaymentDto> {
    const payment = await this.getPaymentById.execute(id);

    if (!payment) {
      throw new NotFoundException();
    }

    return payment.toDto();
  }

  @Get(':id/receipt')
  async getReceipt(@Param('id') id: number) {
    const payment = await this.getPaymentById.execute(id);

    if (!payment) {
      throw new NotFoundException('Not found');
    }

    const receipt = await this.getPaymentReceipt.execute(payment);

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    return receipt;
  }

  @Get(':id/receipt/download')
  async downloadReceipt(@Param('id') id: number, @Res() response: Response) {
    const payment = await this.getPaymentById.execute(id);

    if (!payment) {
      throw new NotFoundException('Not found');
    }

    const receipt = await this.getPaymentReceipt.execute(payment);

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    const buffer = Buffer.from(receipt.content, 'base64');

    response.set({
      'Content-Type': receipt.fileType,
      'Content-Disposition': `attachment; filename="${receipt.fileName}"`,
      'Content-Length': buffer.length,
    });

    response.send(buffer);
  }

  @Post(':id/receipt')
  @UseInterceptors(FileInterceptor('file'))
  async uploadReceipt(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    let receipt: Receipt | null = new Receipt();

    receipt.fileName = file.originalname;
    receipt.content = file.buffer.toString('base64');
    receipt.fileType = file.mimetype;

    receipt = await this.createReceipt.execute(receipt, id);

    if (!receipt) {
      throw new NotFoundException('Payment not found');
    }

    return receipt;
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';

@Controller('api/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() paymentData: Payment): Promise<Payment> {
    return await this.paymentService.createPayment(paymentData);
  }
}

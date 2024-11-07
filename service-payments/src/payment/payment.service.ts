import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    return this.paymentRepository.create(paymentData);
  }
}

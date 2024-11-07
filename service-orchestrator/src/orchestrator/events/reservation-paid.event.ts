import { IEvent } from '@nestjs/cqrs';
import { CreatePaymentDto } from '../dto/create-payment.dto';

export class ReservationPaidEvent implements IEvent {
  constructor(public readonly response: CreatePaymentDto) {}
}

import { ICommand } from '@nestjs/cqrs';
import { CreatePaymentDto } from '../dto/create-payment.dto';

export class ProcessPaymentCommand implements ICommand {
  constructor(public readonly payment: CreatePaymentDto) {}
}

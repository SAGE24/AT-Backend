import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { ProcessPaymentCommand } from '../commands/process-payment.command';
import { ReservationPaidEvent } from '../events/reservation-paid.event';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@CommandHandler(ProcessPaymentCommand)
export class PayReservationHandler
  implements ICommandHandler<ProcessPaymentCommand>
{
  constructor(
    private readonly paymentService: PaymentService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ProcessPaymentCommand): Promise<CreatePaymentDto> {
    const response = await this.paymentService.create(command.payment);

    this.eventBus.publish(new ReservationPaidEvent(response));

    return response;
  }
}
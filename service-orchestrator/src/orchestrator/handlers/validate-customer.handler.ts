import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { ValidateConsumerCommand } from '../commands/validate-customer.command';
import { CustomerValidatedEvent } from '../events/customer-validated.event';
import { CustomerService } from '../services/customer.service';

@CommandHandler(ValidateConsumerCommand)
export class ValidateCustomerHandler
  implements ICommandHandler<ValidateConsumerCommand>
{
  constructor(
    private readonly customerService: CustomerService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ValidateConsumerCommand): Promise<number> {
    const response = await this.customerService.validateOrCreateCustomer(
      command.customerData,
    );
    this.eventBus.publish(new CustomerValidatedEvent(response));
    return response;
  }
}

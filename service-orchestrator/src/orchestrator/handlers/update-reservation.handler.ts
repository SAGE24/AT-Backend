import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateReservationCommand } from '../commands/update-reservation.command';
import { UpdatedStatusEvent } from '../events/updated-status.event';
import { ReservationService } from '../services/reservation.service';

@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler
  implements ICommandHandler<UpdateReservationCommand>
{
  constructor(
    private readonly reservationService: ReservationService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateReservationCommand): Promise<void> {
    const response = await this.reservationService.updateStatus(
      command.flightId,
      command.state,
    );

    this.eventBus.publish(new UpdatedStatusEvent(response));
  }
}

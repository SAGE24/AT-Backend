import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { ReservationCreatedEvent } from '../events/reservation-created.event';
import { ReservationService } from '../services/flight.service';

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler
  implements ICommandHandler<CreateReservationCommand>
{
  constructor(
    private readonly reservationService: ReservationService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateReservationCommand): Promise<number> {
    const { flightData } = command;

    const code = await this.reservationService.createReservation(flightData);

    flightData.seating.forEach((record) => {
      record.flightId = code;
    });

    await this.reservationService.saveDetail(flightData.seating);

    this.eventBus.publish(new ReservationCreatedEvent(code));

    return code;
  }
}

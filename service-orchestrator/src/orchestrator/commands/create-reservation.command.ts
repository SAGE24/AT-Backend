import { ICommand } from '@nestjs/cqrs';
import { CreateReservationDto } from '../dto/create-reservation.dto';

export class CreateReservationCommand implements ICommand {
  constructor(public readonly flightData: CreateReservationDto) {}
}

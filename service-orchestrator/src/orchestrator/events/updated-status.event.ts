import { IEvent } from '@nestjs/cqrs';
import { CreateReservationDto } from '../dto/create-reservation.dto';

export class UpdatedStatusEvent implements IEvent {
  constructor(public readonly code: CreateReservationDto) {}
}

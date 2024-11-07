import { IEvent } from '@nestjs/cqrs';

export class ReservationCreatedEvent implements IEvent {
  constructor(public readonly code: number) {}
}

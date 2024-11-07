import { IEvent } from '@nestjs/cqrs';

export class CustomerValidatedEvent implements IEvent {
  constructor(public readonly code: number) {}
}

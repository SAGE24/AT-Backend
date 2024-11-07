import { ICommand } from '@nestjs/cqrs';

export class UpdateReservationCommand implements ICommand {
  constructor(
    public readonly flightId: number,
    public readonly state: string,
  ) {}
}

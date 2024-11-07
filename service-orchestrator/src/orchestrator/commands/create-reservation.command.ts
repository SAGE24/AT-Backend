import { ICommand } from '@nestjs/cqrs';
import { CreateSeatingDto } from '../dto/create-seating.dto';

export class CreateReservationCommand implements ICommand {
  constructor(
    public readonly flightData: {
      origin: string;
      destination: string;
      departureTime: string;
      amount: number;
      price: number;
      state: string;
      customerCode: number;
      seating: CreateSeatingDto[];
    },
  ) {}
}

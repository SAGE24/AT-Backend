import { CreateSeatingDto } from './create-seating.dto';

export class OrchestratorDto {
  customerData: CustomerRequestDto;
  flightData: FlightRequestDto;
}

export class CustomerRequestDto {
  document: string;
  name: string;
  email: string;
  phone: string;
}

export class FlightRequestDto {
  origin: string;
  destination: string;
  departureTime: string;
  amount: number;
  seating: CreateSeatingDto[];
}

import { Injectable } from '@nestjs/common';
import { FlightRepository } from './flight.repository';
import { Flight } from './entities/flight.entity';

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  async createFlight(flightData: Partial<Flight>): Promise<Flight> {
    return this.flightRepository.create(flightData);
  }

  async updateFlight(id: number, state: string): Promise<Flight> {
    return this.flightRepository.updateState(id, state);
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';

@Injectable()
export class FlightRepository {
  constructor(
    @InjectRepository(Flight)
    private readonly repository: Repository<Flight>,
  ) {}

  async create(flightData: Partial<Flight>): Promise<Flight> {
    const flight = this.repository.create(flightData);
    return this.repository.save(flight);
  }

  async findById(id: number): Promise<Flight> {
    return this.repository.findOne({ where: { id } });
  }

  async updateState(id: number, state: string): Promise<Flight> {
    const flight = await this.findById(id);

    if (!flight) {
      throw new Error(`No existe registro: ${id}`);
    }

    flight.state = state;

    await this.repository.update(id, flight);

    return flight;
  }
}

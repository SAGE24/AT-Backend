import { Injectable } from '@nestjs/common';
import { SeatingRepository } from './seating.repository';
import { Seating } from './entities/seating.entity';

@Injectable()
export class SeatingService {
  constructor(private readonly seatingRepository: SeatingRepository) {}

  async createFlight(seatingData: Partial<Seating>): Promise<Seating> {
    return this.seatingRepository.create(seatingData);
  }
}

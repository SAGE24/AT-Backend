import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seating } from './entities/seating.entity';

@Injectable()
export class SeatingRepository {
  constructor(
    @InjectRepository(Seating)
    private readonly repository: Repository<Seating>,
  ) {}

  async create(seatingData: Partial<Seating>): Promise<Seating> {
    const seating = this.repository.create(seatingData);
    return this.repository.save(seating);
  }
}

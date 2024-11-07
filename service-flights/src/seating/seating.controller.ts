import { Controller, Post, Body } from '@nestjs/common';
import { SeatingService } from './seating.service';
import { Seating } from './entities/seating.entity';

@Controller('api/seating')
export class SeatingController {
  constructor(private readonly seatingService: SeatingService) {}

  @Post()
  async create(@Body() flightData: Seating[]): Promise<Seating[]> {
    const response = await Promise.all(
      flightData.map(async (record) => {
        return await this.seatingService.createFlight(record);
      }),
    );
    return response;
  }
}

import { Controller, Param, Put, Post, Body } from '@nestjs/common';
import { FlightService } from './flight.service';
import { Flight } from './entities/flight.entity';

@Controller('api/flights')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  create(@Body() flightData: Flight): Promise<Flight> {
    return this.flightService.createFlight(flightData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: { state: string },
  ): Promise<Flight> {
    return this.flightService.updateFlight(id, updateData.state);
  }
}

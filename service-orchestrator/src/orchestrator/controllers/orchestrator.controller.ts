import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateConsumerCommand } from '../commands/validate-customer.command';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { UpdateReservationCommand } from '../commands/update-reservation.command';
import { ProcessPaymentCommand } from '../commands/process-payment.command';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { OrchestratorDto } from '../dto/orchestrator.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { Utils } from '../../config/utils';

@Controller('api/orchestrator')
export class OrchestratorController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createReservation(@Body() request: OrchestratorDto) {
    const { customerData, flightData } = request;
    let flightsId = 0;

    try {
      console.log(customerData);
      console.log(flightData);

      const response = await this.commandBus.execute(
        new ValidateConsumerCommand(customerData),
      );
      console.log('código de cliente', response);

      const total = flightData.seating.reduce(
        (acum, record) => acum + record.price,
        0,
      );

      const requestFlights: CreateReservationDto = {
        origin: flightData.origin,
        destination: flightData.destination,
        departureTime: flightData.departureTime,
        amount: flightData.amount,
        price: total,
        state: 'reserved',
        customerCode: response,
        seating: flightData.seating,
      };
      const responseReservation = await this.commandBus.execute(
        new CreateReservationCommand(requestFlights),
      );
      flightsId = responseReservation;
      console.log('código de reserva', flightsId);

      const payment: CreatePaymentDto = {
        customerId: requestFlights.customerCode,
        flightId: flightsId,
        amount: total,
        paymentDate: Utils.getCurrentDate(),
      };
      await this.commandBus.execute(new ProcessPaymentCommand(payment));

      await this.commandBus.execute(
        new UpdateReservationCommand(responseReservation, 'paid'),
      );

      return { status: true, data: requestFlights };
    } catch (error) {
      if (error.response && error.status === 500) {
        await this.commandBus.execute(
          new UpdateReservationCommand(flightsId, 'canceled'),
        );
        console.log('Inactivar reserva', error);
      }
      throw error;
    }
  }
}

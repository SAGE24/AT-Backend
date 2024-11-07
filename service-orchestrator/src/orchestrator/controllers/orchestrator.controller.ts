import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateConsumerCommand } from '../commands/validate-customer.command';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { UpdateReservationCommand } from '../commands/update-reservation.command';
import { ProcessPaymentCommand } from '../commands/process-payment.command';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('api/orchestrator')
export class OrchestratorController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createReservation(@Body() request: any) {
    const { customerData, flightData } = request;

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

      flightData.customerCode = response;
      flightData.price = total;
      flightData.state = 'reserved';
      const responseReservation = await this.commandBus.execute(
        new CreateReservationCommand(flightData),
      );
      flightData.id = responseReservation;
      console.log('código de reserva', responseReservation);

      const dateNow = new Date();
      const dateString = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

      const payment: CreatePaymentDto = {
        customerId: flightData.customerCode,
        flightId: flightData.id,
        amount: total,
        paymentDate: dateString,
      };
      await this.commandBus.execute(new ProcessPaymentCommand(payment));

      await this.commandBus.execute(
        new UpdateReservationCommand(responseReservation, 'paid'),
      );

      return { message: 'Proceso terminado correctamete' };
    } catch (error) {
      if (error.response && error.status === 500) {
        await this.commandBus.execute(
          new UpdateReservationCommand(flightData.id, 'canceled'),
        );
        console.log('Inactivar reserva', error);
      }
      throw error;
    }
  }
}

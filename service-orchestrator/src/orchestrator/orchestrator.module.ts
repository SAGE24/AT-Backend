import { Module } from '@nestjs/common';
import { OrchestratorController } from './controllers/orchestrator.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { CustomerService } from './services/customer.service';
import { ReservationService } from './services/reservation.service';
import { PaymentService } from './services/payment.service';
import { CreateReservationHandler } from './handlers/create-reservation.handler';
import { ValidateCustomerHandler } from './handlers/validate-customer.handler';
import { UpdateReservationHandler } from './handlers/update-reservation.handler';
import { PayReservationHandler } from './handlers/pay-reservation.handler';

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [OrchestratorController],
  providers: [
    CustomerService,
    ReservationService,
    PaymentService,
    CreateReservationHandler,
    ValidateCustomerHandler,
    UpdateReservationHandler,
    PayReservationHandler,
  ],
})
export class OrchestratorModule {}

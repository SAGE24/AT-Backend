export class CreatePaymentDto {
  customerId: number;
  flightId: number;
  amount: number;
  paymentDate: string;
}
export class CreateReservationDto {
  origin: string;
  destination: string;
  departureTime: string;
  amount: number;
  price: number;
  state: string;
  customerCode: number;
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateReservationDto } from './../dto/create-reservation.dto';
import { CreateSeatingDto } from '../dto/create-seating.dto';

@Injectable()
export class ReservationService {
  constructor(private readonly httpService: HttpService) {}

  async createReservation(data: {
    origin: string;
    destination: string;
    departureTime: string;
    amount: number;
    price: number;
    state: string;
    customerCode: number;
  }): Promise<number> {
    const response = await lastValueFrom(
      this.httpService.post('http://localhost:3001/api/flights', data),
    );

    return response.data.id;
  }

  async updateStatus(id: number, state: string): Promise<CreateReservationDto> {
    const response = await lastValueFrom(
      this.httpService.put(`http://localhost:3001/api/flights/${id}`, {
        state,
      }),
    );
    return response.data;
  }

  async saveDetail(seating: CreateSeatingDto[]): Promise<void> {
    await lastValueFrom(
      this.httpService.post(`http://localhost:3001/api/seating`, seating),
    );
  }
}

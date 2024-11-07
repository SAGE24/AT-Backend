import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentDto } from './../dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  async create(request: CreatePaymentDto): Promise<CreatePaymentDto> {
    try {
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3002/api/payments', request),
      );
      return response.data;
    } catch {
      throw new HttpException(
        'Error al pagar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

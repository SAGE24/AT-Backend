import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(private readonly httpService: HttpService) {}

  async validateOrCreateCustomer(customerData: {
    document: string;
    name: string;
    email: string;
    phone: string;
  }): Promise<number> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `http://localhost:3000/api/customers/${customerData.document}`,
        ),
      );
      return response.data.id;
    } catch {
      const newRecord = await lastValueFrom(
        this.httpService.post(
          'http://localhost:3000/api/customers',
          customerData,
        ),
      );

      return newRecord.data.id;
    }
  }
}

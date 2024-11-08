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
    const response = await lastValueFrom(
      this.httpService.get(
        `${process.env.URL_SERVICE_CUSTOMERS}/api/customers/${customerData.document}`,
      ),
    );

    if (response.status === 200) return response.data.id;

    const newRecord = await lastValueFrom(
      this.httpService.post(
        `${process.env.URL_SERVICE_CUSTOMERS}/api/customers`,
        customerData,
      ),
    );

    return newRecord.data.id;
  }
}

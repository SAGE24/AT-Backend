import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getCustomerByDocument(document: string): Promise<Customer> {
    const customer = await this.customerRepository.findByDocument(document);
    if (!customer) {
      throw new NotFoundException('Cliente no existe');
    }
    return customer;
  }

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    return this.customerRepository.create(customerData);
  }
}

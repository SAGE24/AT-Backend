import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async findByDocument(document: string): Promise<Customer> {
    return this.repository.findOne({ where: { document } });
  }

  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.repository.create(customerData);
    return this.repository.save(customer);
  }
}

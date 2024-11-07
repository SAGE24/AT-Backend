import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('api/customers')
@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Obtener un cliente por documento' })
  @ApiResponse({ status: 200, description: 'Detalles del cliente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @Get(':document')
  findByDocument(@Param('document') document: string): Promise<Customer> {
    return this.customerService.getCustomerByDocument(document);
  }

  @ApiOperation({ summary: 'Crear cliente' })
  @Post()
  create(@Body() customerData: Customer): Promise<Customer> {
    return this.customerService.createCustomer(customerData);
  }
}

import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('api/customers')
@Controller('api/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Obtener un cliente por documento' })
  @ApiResponse({ status: 200, description: 'Detalles del cliente.' })
  @ApiResponse({ status: 201, description: 'Cliente no encontrado.' })
  @Get(':document')
  async findByDocument(
    @Param('document') document: string,
    @Res() res: Response,
  ) {
    const customer = await this.customerService.getCustomerByDocument(document);
    if (customer) {
      return res.status(HttpStatus.OK).json(customer);
    } else {
      return res.status(HttpStatus.NO_CONTENT).send();
    }
  }

  @ApiOperation({ summary: 'Crear cliente' })
  @Post()
  create(@Body() customerData: Customer): Promise<Customer> {
    return this.customerService.createCustomer(customerData);
  }
}

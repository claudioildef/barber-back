import { Body, Controller, Get, Post } from '@nestjs/common';
import { BarberService } from './barber.service';
import { CreateBarberDto } from './dto/create-barber.dto';

@Controller('barber')
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Get('')
    getAll() {
      return this.barberService.getAll();
    }

  @Post('create')
    create(@Body() createBarberDto: CreateBarberDto) {
      return this.barberService.create(createBarberDto);
    }

}

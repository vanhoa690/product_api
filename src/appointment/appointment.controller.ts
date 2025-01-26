import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './appointment.dto';
import { validateObjectId } from 'src/utils';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    validateObjectId(id);
    return this.appointmentService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    validateObjectId(id);
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    validateObjectId(id);
    return this.appointmentService.delete(id);
  }
}

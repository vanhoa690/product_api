import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppointmentDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  doctorId: Types.ObjectId;

  relativeId: Types.ObjectId;

  @IsDateString()
  date: string;

  @IsEnum(['confirmed', 'canceled', 'completed'])
  status: string;
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}

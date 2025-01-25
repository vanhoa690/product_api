import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppointmentDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  childId: Types.ObjectId;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  doctor: {
    name: string;
    specialty: string;
    clinic: string;
  };

  @IsEnum(['confirmed', 'canceled', 'completed'])
  status: string;
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}

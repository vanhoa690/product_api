import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateExpenseDto {
  @IsNotEmpty()
  appointmentId: Types.ObjectId;

  @IsNotEmpty()
  userId: Types.ObjectId;

  relativeId: Types.ObjectId;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsDateString()
  date: string;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}

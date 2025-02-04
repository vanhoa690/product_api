import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  // IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  clinicAddress?: string;

  @IsOptional()
  schedule?: string[];
}

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}

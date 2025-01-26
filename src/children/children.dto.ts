import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChildrenDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @IsNotEmpty()
  @IsEnum(['male', 'female'])
  gender: string;

  @IsNotEmpty()
  userId: Types.ObjectId;
}

export class UpdateChildrenDto extends PartialType(CreateChildrenDto) {}

import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: 'Booking name is required' })
  @MaxLength(255, { message: 'Booking name must not exceed 255 characters' })
  name: string;

  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;
}

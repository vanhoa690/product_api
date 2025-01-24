import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  @MaxLength(255, { message: 'Product name must not exceed 255 characters' })
  name: string;

  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;
}

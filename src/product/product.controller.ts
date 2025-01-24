import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Tạo sản phẩm mới
  @Post()
  create(@Body() createProductDto: CreateProductDto): {
    id: number;
    name: string;
    price: number;
  } {
    return this.productService.create(createProductDto);
  }

  // Lấy danh sách tất cả sản phẩm
  @Get()
  findAll(): { id: number; name: string; price: number }[] {
    return this.productService.findAll();
  }

  // Lấy thông tin sản phẩm theo ID
  @Get(':id')
  findOne(@Param('id') id: string): {
    id: number;
    name: string;
    price: number;
  } {
    return this.productService.findOne(+id);
  }

  // Cập nhật thông tin sản phẩm theo ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): { id: number; name: string; price: number } {
    return this.productService.update(+id, updateProductDto);
  }

  // Xóa sản phẩm theo ID
  @Delete(':id')
  remove(@Param('id') id: string): { id: number; name: string; price: number } {
    return this.productService.remove(+id);
  }
}

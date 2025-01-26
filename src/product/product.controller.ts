import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded!');
    }
    return {
      message: 'File uploaded successfully!',
      filePath: `/uploads/products/${file.filename}`,
    };
  }
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded!');
    }
    const imageUrl = `/uploads/products/${file.filename}`;
    const updatedProduct = await this.productService.updateProductImage(
      id,
      imageUrl,
    );
    return {
      message: 'Product image updated successfully!',
      product: updatedProduct,
    };
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product | null> {
    return this.productService.remove(id);
  }
}

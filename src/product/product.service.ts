import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async updateProductImage(
    productId: string,
    imageUrl: string,
  ): Promise<Product | null> {
    const updateProduct = await this.productModel.findById(productId).exec();
    if (!updateProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    // Delete image from local file system
    if (updateProduct.imageUrl) {
      const filePath = path.join(__dirname, '..', '..', updateProduct.imageUrl);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file
      }
    }
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      { imageUrl },
      { new: true },
    );
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<Product | null> {
    const deletedProduct = await this.productModel.findById(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    // Delete image from local file system
    if (deletedProduct.imageUrl) {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        deletedProduct.imageUrl,
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file
      }
    }
    return await this.productModel.findByIdAndDelete(id);
  }
}

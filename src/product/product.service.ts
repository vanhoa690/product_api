import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Định nghĩa kiểu dữ liệu Product
interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  private products: Product[] = []; // Danh sách sản phẩm

  // Tạo sản phẩm mới
  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: Date.now(), // Sử dụng timestamp làm ID
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Lấy tất cả sản phẩm
  findAll(): Product[] {
    return this.products;
  }

  // Lấy sản phẩm theo ID
  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Cập nhật sản phẩm
  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id); // Tìm sản phẩm
    const updatedProduct = { ...product, ...updateProductDto }; // Gộp thông tin
    this.products = this.products.map((p) =>
      p.id === id ? updatedProduct : p,
    );
    return updatedProduct;
  }

  // Xóa sản phẩm
  remove(id: number): Product {
    const product = this.findOne(id); // Tìm sản phẩm
    this.products = this.products.filter((p) => p.id !== id); // Loại bỏ sản phẩm
    return product;
  }
}

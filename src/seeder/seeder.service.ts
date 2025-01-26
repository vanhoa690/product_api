import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { Category } from '../category/category.schema';
import { User } from '../auth/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seed() {
    await this.clearDatabase();
    await this.seedCategories();
    await this.seedUsers();
    await this.seedProducts();
    this.logger.log('Seeding completed!');
  }

  private async clearDatabase() {
    await this.productModel.deleteMany({});
    await this.categoryModel.deleteMany({});
    await this.userModel.deleteMany({});
    this.logger.log('Database cleared.');
  }

  private async seedCategories() {
    const categories = [
      { name: 'Electronics' },
      { name: 'Books' },
      { name: 'Clothing' },
    ];
    await this.categoryModel.insertMany(categories);
    this.logger.log('Categories seeded.');
  }

  private async seedUsers() {
    const users = [
      {
        name: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10), // Hash password
      },
      {
        name: 'user',
        email: 'user@example.com',
        password: await bcrypt.hash('password123', 10),
      },
    ];
    await this.userModel.insertMany(users);
    this.logger.log('Users seeded.');
  }

  private async seedProducts() {
    const categories = await this.categoryModel.find().exec();
    if (categories.length === 0) {
      this.logger.error('No categories found. Seed categories first.');
      return;
    }

    const products = [
      { name: 'Smartphone', price: 699, category: categories[0]._id },
      { name: 'Laptop', price: 999, category: categories[0]._id },
      { name: 'Novel', price: 19, category: categories[1]._id },
      { name: 'T-shirt', price: 25, category: categories[2]._id },
    ];
    await this.productModel.insertMany(products);
    this.logger.log('Products seeded.');
  }
}

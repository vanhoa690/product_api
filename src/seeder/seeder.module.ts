import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { Product, ProductSchema } from '../product/product.schema';
import { Category, CategorySchema } from '../category/category.schema';
import { User, UserSchema } from '../auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}

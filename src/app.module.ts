import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/db_nestjs'),
    ProductModule,
    AuthModule,
    UserModule,
    BookingModule,
  ],
})
export class AppModule {}

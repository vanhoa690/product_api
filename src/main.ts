import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các trường không được khai báo trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có trường không hợp lệ
      transform: true, // Chuyển đổi kiểu dữ liệu (vd: string -> number)
    }),
  );

  await app.listen(3000);
}
bootstrap();

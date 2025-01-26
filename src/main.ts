import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const seederService = app.get(SeederService);
  // await seederService.seed();
  app.enableCors();
  // Kích hoạt ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các trường không được khai báo trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có trường không hợp lệ
      transform: true, // Chuyển đổi kiểu dữ liệu (vd: string -> number)
    }),
  );

  // Cấu hình thư mục tĩnh
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
}
bootstrap();

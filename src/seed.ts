import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get(SeederService);
  await seederService.seed();
  await app.close();
}

runSeeder();

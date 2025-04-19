import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import mongoose from 'mongoose';

async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error('ALERT: Gagal koneksi ke MongoDB! Pastikan MONGO_URI benar dan database dapat diakses.');
    console.error(error);
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();

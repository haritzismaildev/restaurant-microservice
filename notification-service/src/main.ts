import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import mongoose from 'mongoose';

async function bootstrap() {
  try {
    // Cek koneksi ke database
    await mongoose.connect(process.env.MONGO_URI as string, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error('ALERT: Gagal koneksi ke MongoDB! Pastikan MONGO_URI benar dan database dapat diakses.');
    console.error(error);
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3002, '0.0.0.0');
}
bootstrap();

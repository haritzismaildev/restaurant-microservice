import { Module } from '@nestjs/common';
import { KitchenModule } from './kitchen/kitchen.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    KitchenModule,
  ],
})
export class AppModule {}

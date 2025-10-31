import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './transform-response/transform-response.interceptor';
import { json } from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.use('/order/webhook', bodyParser.raw({ type: 'application/json' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted:true}));
  app.useGlobalInterceptors(new TransformResponseInterceptor)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

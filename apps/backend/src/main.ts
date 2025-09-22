import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('ShopLite API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, doc);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

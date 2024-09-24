import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class validator 세팅
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  app.enableCors();

  // swagger 세팅
  const config = new DocumentBuilder()
    .setTitle('Eventory Server')
    .setDescription('Eventory API description')
    .setVersion('1.0')
    .addTag('Eventory')
    .build();

  await app.listen(3000);
}
bootstrap();

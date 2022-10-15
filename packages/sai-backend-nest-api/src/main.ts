import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  // const reflactor = new Reflector();
  // app.useGlobalGuards(new AtGuard(reflactor));
  const config = new DocumentBuilder()
    .setTitle('Sport with AI (SAI)')
    .setDescription('')
    .setVersion('1.0')
    .addTag('sai')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();

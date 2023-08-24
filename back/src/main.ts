import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors(); // Autorisez toutes les origines (utilisez avec précaution en développement)
  app.setGlobalPrefix('api')
  await app.listen(3001);
}

bootstrap();

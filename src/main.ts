import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API ShareSpace')
    .setDescription('Documentation of API ShareSpace')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  // Create Swagger document
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('API', app, swaggerDocument);

  // Server Listen Port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

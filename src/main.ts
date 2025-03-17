import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  try {
    // Criação da aplicação Nest com Fastify
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    // Habilita o CORS
    app.enableCors();

    // Prefixo global para todas as rotas
    app.setGlobalPrefix('api');

    // Configuração do Swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API ShareSpace')
      .setDescription('API documentation for ShareSpace')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    // Criar e configurar Swagger
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, swaggerDocument);

    // Verificar e definir a porta do servidor
    const port = process.env.PORT ?? 3000;

    if (!port) {
      throw new Error('Port not defined');
    }

    // Iniciar o servidor Fastify
    await app.listen(port, '0.0.0.0');
  } catch (error: unknown) {
    // Tratamento do erro
    if (error instanceof Error) {
      console.error('Error during application startup:', error.message);
    } else {
      console.error('Unknown error during application startup', error);
    }
  }
}

bootstrap();

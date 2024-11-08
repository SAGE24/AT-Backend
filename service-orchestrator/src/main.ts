import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.URL_PAGE,
    methods: process.env.METHODS,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API orchestrator')
    .setDescription(
      'Documentación de servicio, proceso de reserva y pago de pasaje',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/orchestrator', app, document);

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();

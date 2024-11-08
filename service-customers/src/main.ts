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
    .setTitle('API Customer')
    .setDescription(
      'Documentación de servicios, consulta por documento y crear cliente',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/customer', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

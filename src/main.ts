import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Desafio 04 M6 Claudinier JC Neto')
    .setDescription('User and Contact Records API')
    .setVersion('1.0')
    .setContact("Linkedin", "https://www.linkedin.com/in/claudinierjcneto", "devneto576@gmail.com")
    .addTag("Users")
    .addTag("Auth")
    .addTag("Contacts")
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({ origin: "*" })
  await app.listen(3000);
}
bootstrap();

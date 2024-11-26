import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from "helmet";
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet({ contentSecurityPolicy: true }));

  const configService = app.get<ConfigService>(ConfigService);

  const cookieSecret = configService.get("cookie_secret.secret");
  app.use(cookieParser(cookieSecret));

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  const serverPort = configService.get("server.port");
  await app.listen(serverPort);

}
bootstrap();

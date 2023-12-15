import * as dotenv from 'dotenv';

dotenv.config();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './utils/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          level: 'log',
          format: format.combine(format.timestamp(), format.ms()),
        }),
        new transports.Console({
          level: 'warn',
          format: format.combine(format.timestamp(), format.ms()),
        }),

        new transports.Console({
          level: 'error',
          format: format.combine(
            format.timestamp(),
            format.ms(),
            format.errors({ stack: true }),
          ),
        }),
        new transports.Console({
          level: 'debug',
          format: format.combine(format.timestamp(), format.ms()),
        }),
      ],
    }),
  });

  app.enableCors();

  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  initializeSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module.js';
import {UnprocessableEntityException, ValidationPipe} from "@nestjs/common";
import {ValidationError} from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const formattedErrors = errors.reduce<Record<string, string>>((acc, error) => {
        if (error.constraints) {
          acc[error.property] = Object.values(error.constraints)[0];
        }
        return acc;
      }, {});

      return new UnprocessableEntityException(formattedErrors);
    }
  }));

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

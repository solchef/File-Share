import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./filters/HttpExceptions.filter";
import { AppModule } from "./app.module";
import { connectMicroservices } from "./connectMicroservices";
import {
  swaggerPath,
  swaggerDocumentOptions,
  swaggerSetupOptions,
} from "./swagger";

import { Logger } from "nestjs-pino";

const { PORT = 3000 } = process.env;

async function main() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  // Configure CORS with specific allowed origins
  app.enableCors({
    origin: ['https://hedgeboard.hostnations.pro'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed methods
    credentials: true, // Allow cookies or authentication headers
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    })
  );

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  // Check if there is Public decorator for each path and method
  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (
        Array.isArray(method.security) &&
        method.security.includes("isPublic")
      ) {
        method.security = [];
      }
    });
  });

  await connectMicroservices(app);
  await app.startAllMicroservices();

  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  void app.listen(PORT);

  return app;
}

module.exports = main();

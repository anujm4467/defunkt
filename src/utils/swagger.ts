import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'fs';

export function initializeSwagger(app: INestApplication): void {
  // Create a swagger document for the app.
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  if (process.env.NODE_ENV === 'development') {
    // Create the .postman folder if it doesn't exist
    mkdirSync('.postman', { recursive: true });

    // Write the Swagger JSON file to the .postman folder
    writeFileSync('.postman/swagger-spec.json', JSON.stringify(document));
  }

  SwaggerModule.setup('docs', app, document);
}

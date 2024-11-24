import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

const baseURL = 'http://localhost:3000';

export function appCreate(app: INestApplication): void {
  // now we dont have to add ValidationPipe to each of the controllers
  app.useGlobalPipes(
    new ValidationPipe({
      // if a property doesnt exist inside a DTO, Nest wont send it to the controller
      whitelist: true,
      forbidNonWhitelisted: true,
      // transforms incoming request to instance of the DTO class after validation
      transform: true,
      transformOptions: {
        // now validation pipe will convert, so we don't need the Type decorators in DTOs
        enableImplicitConversion: true,
      },
    }),
  );

  //configuring Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog App API')
    .setDescription(`Use the base API URL as ${baseURL}`)
    //provide url to direct to tos
    .setTermsOfService(`${baseURL}/dummy-tos`)
    .setLicense('MIT License', `${baseURL}/dummy-license`)
    .addServer(baseURL)
    .setVersion('1.0')
    .build();
  // instantiate document obj
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //set up AWS SDK
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKey'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  //enable cors
  app.enableCors();
}

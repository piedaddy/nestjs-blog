import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //add middleware
  appCreate(app);

  // add interceptor globally
  // app.useGlobalInterceptors(new DataResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

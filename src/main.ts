import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`starting the app`)
  console.log(`App will run on ${process.env.PORT}`)
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: false,
  });
  await app.listen(process.env.PORT);
  console.log(`App running on ${process.env.PORT}`)
}
// eslint-disable-next-line no-void
void bootstrap();

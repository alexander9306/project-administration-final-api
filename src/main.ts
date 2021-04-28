import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config/configuration';

async function bootstrap() {
  console.log(`starting the app`);
  console.log(`App will run on port: ${process.env.PORT}`);
  console.log(`MONGO is on: ${process.env.MONGO_URL}`);
  console.log(`the enviroment is on: ${process.env.NODE_ENV}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: false,
  });
  await app.listen(process.env.PORT);
}
// eslint-disable-next-line no-void
void bootstrap();

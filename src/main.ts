import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config/configuration';

async function bootstrap() {
  console.log(`starting the app`);
  console.log(`App will run on port: ${configuration.port}`);
  console.log(`MONGO is on: ${configuration.database.uri}`);
  console.log(`the enviroment is on: ${configuration.env}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: false,
  });
  await app.listen(process.env.PORT);
}
// eslint-disable-next-line no-void
void bootstrap();

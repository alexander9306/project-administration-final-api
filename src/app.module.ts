import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { validationSchema } from './env.validation';
import { ArticulosModule } from './articulos/articulos.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { configuration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env', '.env.development'],
      isGlobal: true,
      validationSchema,
    }),
    MongooseModule.forRoot(
      !configuration.isProduction()
        ? configuration.database.uri_prod
        : configuration.database.uri,
      { useFindAndModify: false },
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ArticulosModule,
    TicketsModule,
    UsuariosModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ArticulosService } from './articulos.service';
import { Articulo, ArticuloSchema } from './entities/articulo.entity';
import { ArticulosResolver } from './articulos.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Articulo.name, schema: ArticuloSchema },
    ]),
    AuthModule,
  ],
  providers: [
    ArticulosResolver,
    ArticulosService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [ArticulosService],
})
export class ArticulosModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticulosService } from './articulos.service';
import { Articulo, ArticuloSchema } from './entities/articulo.entity';
import { ArticulosResolver } from './articulos.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Articulo.name, schema: ArticuloSchema },
    ]),
  ],
  providers: [ArticulosResolver, ArticulosService],
  exports: [ArticulosService],
})
export class ArticulosModule {}

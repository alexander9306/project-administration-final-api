import { ObjectType } from '@nestjs/graphql';

import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Articulo } from '../../articulos/entities/articulo.entity';

export type DetalleDocument = Detalle & Document;

@ObjectType()
@Schema()
export class Detalle {
  @Prop()
  cantidad: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Articulo',
  })
  articulo: Articulo;
}

export const DetalleSchema = SchemaFactory.createForClass(Detalle);

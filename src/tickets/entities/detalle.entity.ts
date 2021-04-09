import { ObjectType } from '@nestjs/graphql';

import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Articulo } from '../../articulos/entities/articulo.entity';

export type DetalleDocument = Detalle & Document;

@ObjectType()
// @Schema()
export class Detalle {
  @Prop()
  cantidad: number;

  @Prop({ type: Types.ObjectId, ref: 'Articulo' })
  articulo: Articulo;
}

// export const DetalleSchema = SchemaFactory.createForClass(Detalle);

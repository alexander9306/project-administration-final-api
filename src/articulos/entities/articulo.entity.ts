import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticuloDocument = Articulo & Document;

@ObjectType()
@Schema()
export class Articulo {
  @Field(() => ID)
  id: string;

  @Prop()
  nombre: string;

  @Prop()
  codigo: string;

  @Prop()
  posicion: string;

  @Prop()
  stock: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo);

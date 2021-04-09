import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Rol {
  ADMIN = 'Adminstrador',
  ENCARGADO = 'Encargado',
}

registerEnumType(Rol, {
  name: 'Rol',
});

export type UsuarioDocument = Usuario & Document;

@ObjectType()
@Schema()
export class Usuario {
  @Field(() => ID)
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: Object.values(Rol),
    required: true,
  })
  rol: Rol;

  @Prop()
  estado: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

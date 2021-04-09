import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Detalle } from './detalle.entity';

export type TicketDocument = Ticket & Document;

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id: string;

  @Prop()
  cantidad: number;

  @Prop([Detalle])
  detalles: Detalle[];

  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  usuario: Usuario;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

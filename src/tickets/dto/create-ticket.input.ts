import { InputType, Field } from '@nestjs/graphql';
import { DetalleInput } from './detalle.input';

@InputType()
export class CreateTicketInput {
  @Field(() => [DetalleInput])
  detalles: DetalleInput[];
}

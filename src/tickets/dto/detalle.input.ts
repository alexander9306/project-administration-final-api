import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class DetalleInput {
  cantidad: number;

  @Field(() => ID)
  articulo: string;
}

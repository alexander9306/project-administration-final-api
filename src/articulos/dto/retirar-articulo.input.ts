import { Field, ID } from '@nestjs/graphql';

export class RetirarArticuloInput {
  @Field(() => ID)
  id: string;

  cantidad: number;
}

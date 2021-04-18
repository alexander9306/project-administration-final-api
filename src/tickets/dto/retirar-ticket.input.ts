import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RetirarTicketInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  usuario: string;
}

import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTicketInput } from './create-ticket.input';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @Field(() => ID)
  id: string;
}

import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateArticuloInput } from './create-articulo.input';

@InputType()
export class UpdateArticuloInput extends PartialType(CreateArticuloInput) {
  @Field(() => ID)
  id: string;
}

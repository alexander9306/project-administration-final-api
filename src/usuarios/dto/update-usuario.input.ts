import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateUsuarioInput } from './create-usuario.input';

@InputType()
export class UpdateUsuarioInput extends PartialType(CreateUsuarioInput) {
  @Field(() => ID)
  id: string;
}

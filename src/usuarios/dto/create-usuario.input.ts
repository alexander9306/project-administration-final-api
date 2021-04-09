import { InputType } from '@nestjs/graphql';
import { Rol } from '../entities/usuario.entity';

@InputType()
export class CreateUsuarioInput {
  username: string;

  password: string;

  rol: Rol;
}

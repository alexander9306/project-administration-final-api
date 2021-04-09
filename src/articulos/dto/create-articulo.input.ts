import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateArticuloInput {
  nombre: string;

  codigo: string;

  posicion: string;

  stock: number;
}

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ArticulosService } from './articulos.service';
import { Articulo } from './entities/articulo.entity';
import { CreateArticuloInput } from './dto/create-articulo.input';
import { UpdateArticuloInput } from './dto/update-articulo.input';

@Resolver(() => Articulo)
export class ArticulosResolver {
  constructor(private readonly articulosService: ArticulosService) {}

  @Mutation(() => Articulo)
  createArticulo(
    @Args('createArticuloInput') createArticuloInput: CreateArticuloInput,
  ) {
    return this.articulosService.create(createArticuloInput);
  }

  @Query(() => [Articulo], { name: 'articulos' })
  findAll() {
    return this.articulosService.findAll();
  }

  @Query(() => Articulo, { name: 'articulo' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.articulosService.findOne(id);
  }

  @Mutation(() => Articulo)
  updateArticulo(
    @Args('updateArticuloInput') updateArticuloInput: UpdateArticuloInput,
  ) {
    return this.articulosService.update(updateArticuloInput);
  }

  @Mutation(() => Articulo)
  removeArticulo(@Args('id', { type: () => ID }) id: string) {
    return this.articulosService.remove(id);
  }
}

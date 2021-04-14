import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Token } from './entities/token.entity';
import { Public } from '../auth/guards/gql-auth.guard';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Usuario)
  createUsuario(
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput,
  ) {
    return this.usuariosService.create(createUsuarioInput);
  }

  @Public()
  @Mutation(() => Token, { nullable: true })
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    if (user) return this.authService.login(user);
    return null;
  }

  @Query(() => [Usuario], { name: 'usuarios' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Query(() => Usuario, { name: 'usuario' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usuariosService.findOne(id);
  }

  @Mutation(() => Usuario)
  updateUsuario(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
  ) {
    return this.usuariosService.update(updateUsuarioInput);
  }

  @Mutation(() => Usuario)
  removeUsuario(@Args('id', { type: () => ID }) id: string) {
    return this.usuariosService.remove(id);
  }
}

import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { UsuariosService } from './usuarios.service';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { UsuariosResolver } from './usuarios.resolver';
import { AuthModule } from '../auth/auth.module';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    UsuariosResolver,
    UsuariosService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {}

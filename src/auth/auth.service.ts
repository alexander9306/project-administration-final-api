import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Payload } from './entities/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  login(user: Usuario) {
    const payload: Payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

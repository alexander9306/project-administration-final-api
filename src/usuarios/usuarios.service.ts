import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Rol, Usuario, UsuarioDocument } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<UsuarioDocument>,
  ) {}

  create(createUsuarioInput: CreateUsuarioInput) {
    const createdUsuario = new this.usuarioModel(createUsuarioInput);
    return createdUsuario.save();
  }

  findAll() {
    return this.usuarioModel.find().exec();
  }

  findOne(id: string) {
    return this.usuarioModel.findById(id).exec();
  }

  async findOneByUsername(username: string) {
    const found = await this.usuarioModel
      .find({
        username,
      })
      .exec();

    const users: Usuario[] = [
      {
        id: 'jelkrkdv',
        username: 'john',
        password: 'changeme',
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: true,
        rol: Rol.ADMIN,
      },
      {
        id: 'jelkrkdv',
        username: 'chris',
        password: 'secret',
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: true,
        rol: Rol.ENCARGADO,
      },
      {
        id: 'jelkrkdv',
        username: 'maria',
        password: 'guess',
        createdAt: new Date(),
        updatedAt: new Date(),
        estado: true,
        rol: Rol.ENCARGADO,
      },
    ];

    return found ?? process.env.MOCK_USERS
      ? users.find((user) => user.username === username)
      : undefined;
  }

  update(updateUsuarioInput: UpdateUsuarioInput) {
    const { id, ...usuario } = updateUsuarioInput;
    return this.usuarioModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...usuario, updatedAt: new Date() },
        },
        { new: true },
      )
      .exec();
  }

  remove(id: string) {
    return this.usuarioModel.deleteOne({ _id: id }).exec();
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticuloInput } from './dto/create-articulo.input';
import { UpdateArticuloInput } from './dto/update-articulo.input';
import { Articulo, ArticuloDocument } from './entities/articulo.entity';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectModel(Articulo.name) private articuloModel: Model<ArticuloDocument>,
  ) {}

  create(createArticuloInput: CreateArticuloInput) {
    const createdArticulo = new this.articuloModel(createArticuloInput);
    return createdArticulo.save();
  }

  findAll() {
    return this.articuloModel.find().exec();
  }

  findAllByIds(ids: string[]) {
    return this.articuloModel.find({ _id: { $in: ids } }).exec();
  }

  findOne(id: string) {
    return this.articuloModel.findById(id).exec();
  }

  update(updateArticuloInput: UpdateArticuloInput) {
    const { id, ...articulo } = updateArticuloInput;
    return this.articuloModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...articulo, updatedAt: new Date() },
        },
        { new: true },
      )
      .exec();
  }

  remove(id: string) {
    return this.articuloModel.deleteOne({ _id: id }).exec();
  }

  removeAll() {
    return this.articuloModel.deleteMany({});
  }
}

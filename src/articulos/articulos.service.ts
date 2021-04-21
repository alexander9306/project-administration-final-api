import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticuloInput } from './dto/create-articulo.input';
import { UpdateArticuloInput } from './dto/update-articulo.input';
import { Articulo, ArticuloDocument } from './entities/articulo.entity';
import { RetirarArticuloInput } from './dto/retirar-articulo.input';

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

  async bulkUpdate(updateArticuloBulkInput: RetirarArticuloInput[]) {
    const foundArticulos = await this.articuloModel.find({
      _id: { $in: updateArticuloBulkInput.map((ar) => ar.id) },
    });

    const stockMap: Record<string, number> = {};

    foundArticulos.forEach((r) => {
      stockMap[r.id] = r.stock;
    });

    const bulk = this.articuloModel.collection.initializeUnorderedBulkOp();

    updateArticuloBulkInput.forEach((articulo) => {
      bulk.find({ _id: articulo.id }).update({
        $set: {
          updatedAt: new Date(),
          stock: stockMap[articulo.id]
            ? stockMap[articulo.id] - articulo.cantidad
            : undefined,
        },
      });
    });

    const res = await bulk.execute();

    console.log(res);
    return res;
  }

  remove(id: string) {
    return this.articuloModel.deleteOne({ _id: id }).exec();
  }

  async removeAll() {
    const res = await this.articuloModel.deleteMany({});
    return res.deletedCount;
  }
}

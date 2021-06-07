import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { RetirarTicketInput } from './dto/retirar-ticket.input';
import { Ticket, TicketDocument } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name)
    private ticketModel: Model<TicketDocument>, // private articuloModel: Model<ArticuloDocument>,
  ) {}

  async create(createTicketInput: CreateTicketInput, usuario?: string) {
    const createdTicket = new this.ticketModel({
      ...createTicketInput,
      usuario: usuario ? { _id: usuario } : undefined,
    });
    const res = await createdTicket.save();
    return res;
  }

  findAll() {
    return this.ticketModel.find().exec();
  }

  findOne(id: string) {
    return this.ticketModel.findById(id).exec();
  }

  update(updateTicketInput: UpdateTicketInput) {
    const { id, ...ticket } = updateTicketInput;
    return this.ticketModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...((ticket as unknown) as Ticket), updatedAt: new Date() },
        },
        { new: true },
      )
      .exec();
  }

  retirar(retirarTicketInput: RetirarTicketInput) {
    const { id, ...ticket } = retirarTicketInput;
    return this.ticketModel
      .findByIdAndUpdate(
        id,
        {
          $set: { ...((ticket as unknown) as Ticket), updatedAt: new Date() },
        },
        { new: true },
      )
      .exec();
  }

  remove(id: string) {
    return this.ticketModel.deleteOne({ _id: id }).exec();
  }
}

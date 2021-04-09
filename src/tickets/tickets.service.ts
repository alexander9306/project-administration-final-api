import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Ticket, TicketDocument } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  create(createTicketInput: CreateTicketInput) {
    const createdTicket = new this.ticketModel(createTicketInput);
    return createdTicket.save();
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
      .findByIdAndUpdate(id, {
        $set: { ...((ticket as unknown) as Ticket), updatedAt: new Date() },
      })
      .exec();
  }

  remove(id: string) {
    return this.ticketModel.deleteOne({ _id: id }).exec();
  }
}

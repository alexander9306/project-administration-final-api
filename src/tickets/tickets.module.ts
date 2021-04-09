import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticulosModule } from '../articulos/articulos.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { TicketsService } from './tickets.service';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { TicketsResolver } from './tickets.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    ArticulosModule,
    UsuariosModule,
  ],
  providers: [TicketsResolver, TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}

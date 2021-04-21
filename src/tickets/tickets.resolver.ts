import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.model';
import { UsuariosService } from '../usuarios/usuarios.service';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { ArticulosService } from '../articulos/articulos.service';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly usuariosService: UsuariosService,
    private readonly articulosService: ArticulosService,
  ) {}

  @Mutation(() => Ticket)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ) {
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketsService.update(updateTicketInput);
  }

  @Mutation(() => Ticket)
  async retirarTicket(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    const ticket = await this.ticketsService.retirar({
      id,
      usuario: user.userId,
    });

    await this.articulosService.bulkUpdate(
      ticket.detalles.map((det) => ({
        id: (det.articulo as unknown) as string,
        cantidad: det.cantidad,
      })),
    );

    return ticket;
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => ID }) id: string) {
    return this.ticketsService.remove(id);
  }

  @ResolveField()
  usuario(@Parent() ticket: Ticket) {
    const { usuario } = ticket;
    return this.usuariosService.findOne((usuario as unknown) as string);
  }

  @ResolveField()
  async detalles(@Parent() ticket: Ticket) {
    const { detalles } = ticket;
    const articulos = detalles.map((d) => (d.articulo as unknown) as string);
    const res = await this.articulosService.findAllByIds(articulos);

    return detalles.map((detalle) => ({
      cantidad: detalle.cantidad,
      articulo: res.find(
        (ar) => ar.id === ((detalle.articulo as unknown) as string).toString(),
      ),
    }));
  }
}

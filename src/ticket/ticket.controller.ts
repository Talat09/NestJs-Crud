import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketsService } from '../ticket/ticket.service';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({
    status: 201,
    description: 'The ticket has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateTicketDto,
    examples: {
      example1: {
        summary: 'Example Ticket Creation',
        description: 'A simple example of creating a ticket',
        value: {
          route: 'DAC-DXB',
          fare: 25.5,
          status: 'active',
        },
      },
    },
  })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'Return all tickets.' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiResponse({ status: 200, description: 'Return a single ticket.' })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the ticket to retrieve',
    examples: {
      example1: {
        summary: 'Example Ticket ID',
        description: 'A valid ticket ID',
        value: 1,
      },
    },
  })
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiBody({
    type: UpdateTicketDto,
    examples: {
      example1: {
        summary: 'Example Ticket Update',
        description: 'An example of updating ticket details',
        value: {
          status: 'cancelled',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the ticket to update',
    examples: {
      example1: {
        summary: 'Example Ticket ID',
        description: 'A valid ticket ID',
        value: 1,
      },
    },
  })
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiResponse({
    status: 200,
    description: 'The ticket has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Ticket not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the ticket to delete',
    examples: {
      example1: {
        summary: 'Example Ticket ID',
        description: 'A valid ticket ID',
        value: 1,
      },
    },
  })
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(id);
  }
}

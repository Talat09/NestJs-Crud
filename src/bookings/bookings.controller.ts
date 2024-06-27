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
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: 201,
    description: 'The booking has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateBookingDto,
    examples: {
      example1: {
        summary: 'Example Booking 1',
        description: 'A simple example of a booking',
        value: {
          passengerId: 1,
          ticketId: 1,
          status: 'confirmed',
        },
      },
    },
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Return all bookings.' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Return a single booking.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the booking to retrieve',
    examples: {
      example1: {
        summary: 'Example Booking ID',
        description: 'A valid booking ID',
        value: 1,
      },
    },
  })
  findOne(@Param('id') id: number) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  @ApiBody({
    type: UpdateBookingDto,
    examples: {
      example1: {
        summary: 'Example Booking Update',
        description: 'An example of updating booking details',
        value: {
          status: 'cancelled',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the booking to update',
    examples: {
      example1: {
        summary: 'Example Booking ID',
        description: 'A valid booking ID',
        value: 1,
      },
    },
  })
  update(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the booking to delete',
    examples: {
      example1: {
        summary: 'Example Booking ID',
        description: 'A valid booking ID',
        value: 1,
      },
    },
  })
  remove(@Param('id') id: number) {
    return this.bookingsService.remove(id);
  }
}

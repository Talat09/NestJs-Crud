import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { User } from '../users/entities/user.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Ticket } from '../ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Ticket])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { User } from '../users/entities/user.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const passenger = await this.usersRepository.findOne({
      where: { id: createBookingDto.passengerId },
    });
    if (!passenger) {
      throw new NotFoundException(
        `User with ID ${createBookingDto.passengerId} not found`,
      );
    }

    const ticket = await this.ticketsRepository.findOne({
      where: { id: createBookingDto.ticketId },
    });
    if (!ticket) {
      throw new NotFoundException(
        `Ticket with ID ${createBookingDto.ticketId} not found`,
      );
    }

    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      passenger,
      ticket,
    });

    return this.bookingsRepository.save(booking);
  }

  findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({ relations: ['passenger', 'ticket'] });
  }

  findOne(id: number): Promise<Booking> {
    return this.bookingsRepository.findOne({
      where: { id },
      relations: ['passenger', 'ticket'],
    });
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    await this.bookingsRepository.update(id, updateBookingDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookingsRepository.delete(id);
  }
}

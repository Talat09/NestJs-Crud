import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, type: 'varchar', length: 15 })
  phone: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'tinyint' })
  status: number;
}

export default User;

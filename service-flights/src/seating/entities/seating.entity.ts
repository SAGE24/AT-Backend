import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('seatings')
export class Seating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flightId: number;

  @Column({ length: 10 })
  number: string;

  @Column()
  price: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  origin: string;

  @Column({ length: 100 })
  destination: string;

  @Column('timestamp', { name: 'departure_time' })
  departureTime: Date;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column({ length: 20 })
  state: string;

  @Column({ name: 'customer_id' })
  customerCode: number;
}

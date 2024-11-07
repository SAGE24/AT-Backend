import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  flightId: number;

  @Column()
  amount: number;

  @Column('timestamp')
  paymentDate: Date;
}

// review.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Barber } from './Barber';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'int', comment: 'Nota de 1 a 5' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Barber, (barber) => barber.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'barber_id' })
  barberId: string;
}

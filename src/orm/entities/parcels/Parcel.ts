import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/User';
import { ParcelStatus } from '../../../consts/ConstsPercel';

@Entity('parcels')
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: ParcelStatus.PENDING })
  status: ParcelStatus;

  @Column()
  pickupDate: Date;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.parcel)
  user: User;
}

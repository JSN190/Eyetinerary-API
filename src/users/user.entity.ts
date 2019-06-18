import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Itinerary } from '../itineraries/itinerary.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 50, unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 140, nullable: true, select: false })
  email: string;

  @Column({ length: 20, nullable: true })
  location: string;

  @Column({ length: 2, nullable: true })
  country: string;

  @OneToMany(type => Itinerary, itinerary => itinerary.owner)
  itineraries: Itinerary[];

  @CreateDateColumn()
  joined: number;
}

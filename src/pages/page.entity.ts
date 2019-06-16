import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Item } from '../items/item.entity';
import { Itinerary } from '../itineraries/itinerary.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(type => Itinerary, itinerary => itinerary.pages, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  itinerary: Itinerary;

  @Column()
  rankInItinerary: number;

  @OneToMany(type => Item, item => item.page)
  items: Item[];

  @CreateDateColumn()
  created: number;

  @UpdateDateColumn()
  updated: number;
}

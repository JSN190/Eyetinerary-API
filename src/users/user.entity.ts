import { Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany} from 'typeorm';
import { Itinerary } from '../itineraries/itinerary.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    username: string;

    @Column({ select: false })
    password: string;

    @Column({length: 140, nullable: true })
    email: string;

    @Column({ length: 75, nullable: true })
    location: string;

    @Column({ length: 2, nullable: true })
    country: string;

    @OneToMany(type => Itinerary, itinerary => itinerary.owner)
    itineraries: Itinerary[];

    @CreateDateColumn()
    joined: number;
}

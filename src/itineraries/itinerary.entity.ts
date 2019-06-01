import { Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Page } from '../pages/page.entity';
import { User } from '../users/user.entity';

@Entity()
export class Itinerary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 140 })
    title: string;

    @Column({ length: 140 })
    editToken: string;

    @CreateDateColumn()
    created: number;

    @UpdateDateColumn()
    updated: number;

    @ManyToOne(type => User, { nullable: true })
    owner: User;

    @OneToMany(type => Page, page => page.itinerary)
    pages: Page[];
}

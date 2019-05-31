import { Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Page } from '../pages/page.entity';

@Entity()
export class Itinerary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 140 })
    title: string;

    @CreateDateColumn()
    created: number;

    @UpdateDateColumn()
    updated: number;

    @OneToMany(type => Page, page => page.itinerary)
    pages: Page[];
}

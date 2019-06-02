import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Page } from '../pages/page.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Page, page => page.items)
    page: Page;

    @Column({ length: 140 })
    title: string;

    @Column({ length: 1000 })
    body: string;

    @Column({ type: 'timestamp', nullable: false })
    timeStart: Date;

    @Column({ type: 'timestamp', nullable: true })
    timeEnd: Date;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

}

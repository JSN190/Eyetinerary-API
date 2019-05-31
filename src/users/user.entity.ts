import { Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    username: string;

    @Column({ length: 72 })
    password: string;

    @Column({length: 140, nullable: true })
    email: string;

    @Column({ length: 75, nullable: true })
    location: string;

    @Column({ length: 2, nullable: true })
    country: string;

    @CreateDateColumn()
    joined: number;
}

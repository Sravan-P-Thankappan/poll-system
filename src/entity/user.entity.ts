import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "./poll.entity";

@Entity({name:'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 70, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 70,})
    password: string;

    @OneToMany(() => Poll, (poll) => poll.user)
    polls: Poll[]
}

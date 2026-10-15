import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { PollOption } from "./poll-option.entity";

@Entity({name:'poll'})
export class Poll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256 })
    poll: string;

    @ManyToOne(() => User, (user) => user.polls)
    user: User;

    @OneToMany(() => PollOption, (option) => option.poll, { cascade: true })
    options: PollOption[];
}
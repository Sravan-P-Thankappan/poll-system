import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "./poll.entity";

@Entity({name:'poll_option'})
export class PollOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    option: string;

    @ManyToOne(() => Poll, poll =>poll.options,{onDelete:'CASCADE'} )
    poll: Poll;
}
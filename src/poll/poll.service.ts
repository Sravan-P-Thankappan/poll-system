import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePollDto } from 'src/dto/poll.dto';
import { PollOption } from 'src/entity/poll-option.entity';
import { Poll } from 'src/entity/poll.entity';
import { User } from 'src/entity/user.entity';
import { AuthUser } from 'src/types/user.type';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {
    constructor(
        @InjectRepository(Poll)
        private pollRepository: Repository<Poll>,
        @InjectRepository(PollOption)
        private pollOptionRepository: Repository<PollOption>,
        @InjectRepository(User)
        private userRepository: Repository<User>

    ) { }

    async createPoll(createPoll: CreatePollDto, authUser: AuthUser) {
        const { poll, options } = createPoll;
        const user = await this.userRepository.findOne({ where: { id: authUser.id } });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const newPoll = this.pollRepository.create({
            poll,
            options: options.map((op) => ({
                option: op,
            })),
            user
        });
        await this.pollRepository.save(newPoll);
        return {
            message: "Poll Created"
        }
    }

    async fetchPolls() {
        const polls = await this.pollRepository.find({ relations: { options: true } });
        if (polls.length == 0) return { mesaage: "No Data" }
        return {
            message: "Success",
            data: polls
        }
    }
}

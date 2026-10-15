import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Poll } from 'src/entity/poll.entity';
import { PollOption } from 'src/entity/poll-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Poll, PollOption])
  ],
  controllers: [PollController],
  providers: [PollService]
})
export class PollModule { }

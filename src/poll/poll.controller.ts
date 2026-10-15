import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from 'src/dto/poll.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('poll')
export class PollController {
    constructor(
        private pollService: PollService
    ) { }

    @Post('/create')
    createPoll(@Body() createPoll: CreatePollDto, @Req() req: Request) {
        return this.pollService.createPoll(createPoll,req['user'])
    }
}

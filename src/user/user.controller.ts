import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, SignupDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post('login')
    userLogin(@Body() loginDto: LoginDto) {
        return this.userService.userLogin(loginDto);
    }

    @Post('sign-up')
    userSignup(@Body() signupDto: SignupDto) {
        return this.userService.userSignup(signupDto);
    }
}

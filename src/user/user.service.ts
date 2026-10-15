import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, SignupDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async userLogin(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
        if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        if (loginDto.password !== user.password) throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
        const payload = { id: user.id, name: user.name }
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            message: 'Login Successfull',
            access_token: accessToken
        }
    }

    async userSignup(signupDto: SignupDto) {
        const userExisting = await this.userRepository.findOne({ where: { email: signupDto.email } });
        if (userExisting) throw new HttpException('Email id is already registered', HttpStatus.CONFLICT)
        const newUser: User = this.userRepository.create(signupDto);
        await this.userRepository.save(newUser);
        return { message: "User registered" }
    }
}

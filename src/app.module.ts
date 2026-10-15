import { Module } from '@nestjs/common';
import { PollModule } from './poll/poll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'poll',
      entities: [join(__dirname, './entity/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    PollModule,
    UserModule
  ]
})
export class AppModule { }

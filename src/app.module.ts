import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { TweetsController } from './tweets/tweets.controller';
import { TweetsService } from './tweets/tweets.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TweetsController],
  providers: [UsersService, TweetsService, PrismaService],
})
export class AppModule { }

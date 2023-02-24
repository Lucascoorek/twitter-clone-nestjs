import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { TweetsModule } from './tweets/tweets.module';
import { Global } from '@nestjs/common/decorators';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), TweetsModule, UsersModule],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule { }

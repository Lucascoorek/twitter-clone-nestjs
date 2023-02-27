import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { TweetsModule } from './tweets/tweets.module';
import { Global } from '@nestjs/common/decorators';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { TweetsController } from './tweets/tweets.controller';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), TweetsModule, UsersModule],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        TweetsController,
        { path: 'users/:id', method: RequestMethod.GET },
        { path: 'users/addfriend/:id', method: RequestMethod.PATCH },
        { path: 'users/removefriend/:id', method: RequestMethod.PATCH },
      );
  }
}

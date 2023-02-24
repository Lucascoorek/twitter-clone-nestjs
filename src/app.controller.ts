import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TweetService } from './tweet.service';
import { User as UserModel, Tweet as TweetModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly tweetService: TweetService,
  ) { }

  @Get('tweet/:id')
  async getTweetById(@Param('id') id: string): Promise<TweetModel> {
    return this.tweetService.tweet({ id: Number(id) });
  }

  @Get('tweet')
  async getPublishedTweets(): Promise<TweetModel[]> {
    return this.tweetService.tweets({
      where: { published: true },
    });
  }

  @Get('filtered-tweets/:searchString')
  async getFilteredTweets(
    @Param('searchString') searchString: string,
  ): Promise<TweetModel[]> {
    return this.tweetService.tweets({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('tweet')
  async createDraft(
    @Body() tweetData: { title: string; content?: string; authorEmail: string },
  ): Promise<TweetModel> {
    const { title, content, authorEmail } = tweetData;
    return this.tweetService.createTweet({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishTweet(@Param('id') id: string): Promise<TweetModel> {
    return this.tweetService.updateTweet({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('tweet/:id')
  async deleteTweet(@Param('id') id: string): Promise<TweetModel> {
    return this.tweetService.deleteTweet({ id: Number(id) });
  }
}
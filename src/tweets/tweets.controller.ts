import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Tweet as TweetModel } from '@prisma/client';

@Controller('tweets')
export class TweetsController {
    constructor(
        private readonly tweetsService: TweetsService,
    ) { }

    @Get(':id')
    async getTweetById(@Param('id') id: string): Promise<TweetModel> {
        return this.tweetsService.tweet({ id: Number(id) });
    }

    @Get()
    async getPublishedTweets(): Promise<TweetModel[]> {
        return this.tweetsService.tweets({
            where: { published: true },
        });
    }

    @Get('filter/:searchString')
    async getFilteredTweets(
        @Param('searchString') searchString: string,
    ): Promise<TweetModel[]> {
        return this.tweetsService.tweets({
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

    @Post()
    async createDraft(
        @Body() tweetData: { title: string; content?: string; authorEmail: string },
    ): Promise<TweetModel> {
        const { title, content, authorEmail } = tweetData;
        return this.tweetsService.createTweet({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        });
    }


    @Put('publish/:id')
    async publishTweet(@Param('id') id: string): Promise<TweetModel> {
        return this.tweetsService.updateTweet({
            where: { id: Number(id) },
            data: { published: true },
        });
    }

    @Delete(':id')
    async deleteTweet(@Param('id') id: string): Promise<TweetModel> {
        return this.tweetsService.deleteTweet({ id: Number(id) });
    }
}
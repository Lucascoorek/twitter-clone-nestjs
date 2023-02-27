import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    NotFoundException,
    BadRequestException,
    Req
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Tweet as TweetModel } from '@prisma/client';
import { Request } from 'express';

@Controller('tweets')
export class TweetsController {
    constructor(
        private readonly tweetsService: TweetsService,
    ) { }

    @Get(':id')
    async getTweetById(@Param('id') id: string): Promise<TweetModel> {
        const tweet = await this.tweetsService.tweet({ id: Number(id) });
        if (!tweet) {
            throw new NotFoundException();
        }
        return tweet;
    }

    @Get()
    async getPublishedTweets(@Req() req: Request): Promise<TweetModel[]> {
        try {
            return await this.tweetsService.tweets({
                where: { AND: [{ authorId: req.user.id }, { published: true }] },
                orderBy: { createdAt: 'desc' }
            });
        } catch (error) {
            throw new NotFoundException()
        }
    }

    @Get('filter/:searchString')
    async getFilteredTweets(
        @Req() req: Request,
        @Param('searchString') searchString: string,
    ): Promise<TweetModel[]> {
        return this.tweetsService.tweets({
            where: {
                authorId: req.user.id,
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    @Post()
    async createDraft(
        @Req() req: Request,
        @Body() tweetData: { title: string; content?: string; },
    ): Promise<TweetModel> {
        const { title, content } = tweetData;
        if (!title) {
            throw new BadRequestException()
        }
        return this.tweetsService.createTweet({
            title,
            content,
            author: {
                connect: { email: req.user.email },
            },
        });
    }


    @Put('publish/:id')
    async publishTweet(@Param('id') id: string, @Req() req: Request): Promise<TweetModel> {
        try {
            await this.tweetsService.findFirstTweet({
                authorId: req.user.id,
                id: Number(id)
            })

            return this.tweetsService.updateTweet({
                where: { id: Number(id) },
                data: { published: true, updatedAt: new Date(Date.now()) },
            });

        } catch (error) {
            throw new NotFoundException();
        }


    }

    @Delete(':id')
    async deleteTweet(@Param('id') id: string): Promise<TweetModel> {
        try {
            return await this.tweetsService.deleteTweet({ id: Number(id) });

        } catch (error) {
            throw new NotFoundException();
        }
    }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tweet, Prisma } from '@prisma/client';

@Injectable()
export class TweetsService {
    constructor(private prisma: PrismaService) { }

    async tweet(
        tweetWhereUniqueInput: Prisma.TweetWhereUniqueInput,
    ): Promise<Tweet | null> {
        return this.prisma.tweet.findUnique({
            where: tweetWhereUniqueInput,
        });
    }

    async findFirstTweet(
        tweetWhereInput: Prisma.TweetWhereInput,
    ): Promise<Tweet | null> {
        return this.prisma.tweet.findFirstOrThrow({
            where: tweetWhereInput,
        });
    }

    async tweets(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TweetWhereUniqueInput;
        where?: Prisma.TweetWhereInput;
        orderBy?: Prisma.TweetOrderByWithRelationInput;
    }): Promise<Tweet[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tweet.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createTweet(data: Prisma.TweetCreateInput): Promise<Tweet> {
        return this.prisma.tweet.create({
            data,
        });
    }

    async updateTweet(params: {
        where: Prisma.TweetWhereUniqueInput;
        data: Prisma.TweetUpdateInput;
    }): Promise<Tweet> {
        const { data, where } = params;
        return this.prisma.tweet.update({
            data,
            where,
        });
    }

    async deleteTweet(where: Prisma.TweetWhereUniqueInput): Promise<Tweet> {
        return this.prisma.tweet.delete({
            where,
        });
    }
}
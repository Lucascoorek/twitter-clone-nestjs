import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        const tweet = await this.usersService.user({ id: Number(id) });
        if (!tweet) {
            throw new NotFoundException();
        }
        return tweet;
    }


    @Post()
    async signupUser(
        @Body() userData: { name?: string; email: string },
    ): Promise<UserModel> {
        return this.usersService.createUser(userData);
    }
}
import {
    Controller,
    Get,
    Param,
    NotFoundException,
    Req,
    UnauthorizedException,
    Post,
    Body,
    NotAcceptableException,
    Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get(':id')
    async getUserById(@Req() req: Request, @Param('id') id: string): Promise<UserModel> {

        if ((req.user && req.user.id) !== Number(id)) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.user({ id: Number(id) });
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }


    @Post()
    async signupUser(
        @Body() userData: { name?: string; email: string },
    ): Promise<UserModel> {
        if (!userData.email) {
            throw new NotFoundException()
        }
        return this.usersService.createUser(userData);
    }

    @Patch("addfriend/:id")
    async addFriend(@Req() req: Request, @Param('id') id: string,): Promise<UserModel> {
        if (req.user.id === Number(id)) {
            throw new NotAcceptableException()
        }

        const friend = await this.usersService.user({ id: Number(id) });
        if (!friend) {
            throw new NotAcceptableException()
        }

        const user = await this.usersService.updateUser({
            where: { id: req.user.id },
            data: { friends: { connect: [{ id: friend.id }] } }
        })

        await this.usersService.updateUser({
            where: { id: friend.id },
            data: { friends: { connect: [{ id: req.user.id }] } }
        })

        return user;
    }

    @Patch("removefriend/:id")
    async removeFriend(@Req() req: Request, @Param('id') id: string,): Promise<UserModel> {
        if (req.user.id === Number(id)) {
            throw new NotAcceptableException()
        }

        const friend = await this.usersService.user({ id: Number(id) });
        if (!friend) {
            throw new NotAcceptableException()
        }

        const user = await this.usersService.updateUser({
            where: { id: req.user.id },
            data: { friends: { disconnect: [{ id: friend.id }] } }
        })

        await this.usersService.updateUser({
            where: { id: friend.id },
            data: { friends: { disconnect: [{ id: req.user.id }] } }
        })

        return user;
    }
}
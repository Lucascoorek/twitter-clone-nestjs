import {
    Controller,
    Get,
    Param,
    NotFoundException,
    Req,
    UnauthorizedException,
    Post,
    Body
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

        if (req.user.id !== Number(id)) {
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
}
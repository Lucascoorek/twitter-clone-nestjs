import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService,
    ) { }
    use(req: Request, res: Response, next: NextFunction) {
        const { API_KEY } = req.query;

        if (typeof API_KEY === 'string') {
            console.log(API_KEY)
        }

        next();
    }
}
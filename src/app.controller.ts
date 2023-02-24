import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
  ) { }


  @Get()
  welcome(): { message: string } {
    return { message: "Hello from Tweeter Clone by Nestjs" }
  }
}
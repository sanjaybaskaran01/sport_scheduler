import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/authenticated.guard';

@Controller('sport_schedule')
export class SportScheduleController {
  @UseGuards(AuthenticateGuard)
  @Post('create')
  async createSchedule(@Request() req) {
    return req.user;
  }
}

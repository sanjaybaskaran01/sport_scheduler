import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/authenticated.guard';
import { parsedDate } from 'src/utils/parseDate';
import { CreateScheduleDto } from './dto';
import { SportScheduleService } from './sport_schedule.service';

@Controller('sport_schedule')
export class SportScheduleController {
  constructor(private sportScheduleService: SportScheduleService) {}

  @UseGuards(AuthenticateGuard)
  @Post('create')
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.sportScheduleService.insertSlot(parsedDate(createScheduleDto));
  }

  @UseGuards(AuthenticateGuard)
  @Get()
  findAll() {
    return this.sportScheduleService.findAll();
  }
}

import { Module } from '@nestjs/common';
import { SportScheduleController } from './sport_schedule.controller';

@Module({
  controllers: [SportScheduleController],
})
export class SportScheduleModule {}

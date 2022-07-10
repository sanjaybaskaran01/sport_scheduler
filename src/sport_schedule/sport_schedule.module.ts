import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SportScheduleController } from './sport_schedule.controller';
import { SportScheduleService } from './sport_schedule.service';

@Module({
  imports: [PrismaModule],
  controllers: [SportScheduleController],
  providers: [SportScheduleService],
})
export class SportScheduleModule {}

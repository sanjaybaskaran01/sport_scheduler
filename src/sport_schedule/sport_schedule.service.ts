import { Injectable } from '@nestjs/common';
import { Sport_Schedule } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto } from './dto';

@Injectable()
export class SportScheduleService {
  constructor(private prisma: PrismaService) {}
  async insertSlot(createScheduleDto: CreateScheduleDto) {
    const intersectingSlot = await this.prisma.sport_Schedule.findFirst({
      where: {
        OR: [
          {
            AND: [
              {
                start_time: {
                  lt: createScheduleDto.start_time,
                },
              },
              {
                end_time: {
                  gt: createScheduleDto.start_time,
                },
              },
            ],
          },
          {
            AND: [
              {
                start_time: {
                  lt: createScheduleDto.end_time,
                },
              },
              {
                end_time: {
                  gt: createScheduleDto.end_time,
                },
              },
            ],
          },
          {
            AND: [
              {
                start_time: {
                  gt: createScheduleDto.start_time,
                },
              },
              {
                end_time: {
                  lt: createScheduleDto.end_time,
                },
              },
            ],
          },
        ],
      },
    });
    if (!intersectingSlot)
      return this.prisma.sport_Schedule.create({
        data: createScheduleDto,
      });
  }

  async findAll(): Promise<Sport_Schedule[]> {
    const slots = await this.prisma.sport_Schedule.findMany();
    return slots;
  }
}

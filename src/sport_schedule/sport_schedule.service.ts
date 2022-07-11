import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto, ModifiedCreateScheduleDto } from './dto';

@Injectable()
export class SportScheduleService {
  constructor(private prisma: PrismaService) {}
  async insertSlot(
    createScheduleDto: CreateScheduleDto,
  ): Promise<CreateScheduleDto> {
    // Check if End Time is before the start time
    if (createScheduleDto.start_time >= createScheduleDto.end_time) {
      throw new HttpException(
        'Either end time is before start time or they are equal!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const intersectingSlot = await this.prisma.sport_Schedule.findFirst({
      where: {
        OR: [
          {
            // 11:00<12:00 13:00>12:00 !! 11:00<14:00 13:00<14:00
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
          // 11:00<11:30 && 13:00>11:30
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
          // 11:00>10:00 && 13:00<14:00 Choosing first slot
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
          {
            // Identical slot
            AND: [
              {
                start_time: {
                  equals: createScheduleDto.start_time,
                },
                end_time: {
                  equals: createScheduleDto.end_time,
                },
              },
            ],
          },
        ],
      },
    });
    if (!intersectingSlot) {
      const createdSlot = await this.prisma.sport_Schedule.create({
        data: createScheduleDto,
      });
      return createdSlot;
    }
    const { start_time, end_time } = intersectingSlot;
    // Condition 1: If both start time and end time is same.
    if (
      start_time === createScheduleDto.start_time &&
      end_time === createScheduleDto.end_time
    ) {
      throw new HttpException(
        'Identical Slot already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Condition 2: If slot is inbetween an existing slot
    if (
      start_time < createScheduleDto.start_time &&
      end_time > createScheduleDto.start_time
    ) {
      throw new HttpException(
        'Slot is inbetween an existing slot',
        HttpStatus.BAD_REQUEST,
      );
    }
    // 11>9 13<14:30
    // Condition where we change end time of incoming to start time of intersecting slot
    const edgeCondition =
      (start_time < createScheduleDto.end_time &&
        end_time > createScheduleDto.end_time) ||
      (start_time > createScheduleDto.start_time &&
        end_time < createScheduleDto.end_time);
    if (edgeCondition) {
      createScheduleDto.end_time = start_time;
      const createdSlot = await this.prisma.sport_Schedule.create({
        data: createScheduleDto,
      });
      return createdSlot;
    }
  }

  async findAll(): Promise<ModifiedCreateScheduleDto[]> {
    const slots = await this.prisma.sport_Schedule.findMany();
    const modifiedSlots = slots.map((slot) => {
      const mDate = moment(slot.date).format('DD-MM-YYYY');
      const mStartTime = moment(slot.start_time).format('HH:mm');
      const mEndTime = moment(slot.end_time).format('HH-mm');
      return {
        id: slot.id,
        name: slot.name,
        date: mDate,
        start_time: mStartTime,
        end_time: mEndTime,
      };
    });
    return modifiedSlots;
  }
}

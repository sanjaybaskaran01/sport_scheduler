import { CreateScheduleDto } from 'src/sport_schedule/dto';

export const parsedDate = (createScheduleDto: CreateScheduleDto) => {
  createScheduleDto.start_time = new Date(
    `${createScheduleDto.date} ${createScheduleDto.start_time}`,
  );
  createScheduleDto.end_time = new Date(
    `${createScheduleDto.date} ${createScheduleDto.end_time}`,
  );
  createScheduleDto.date = new Date(createScheduleDto.date);
  return createScheduleDto;
};

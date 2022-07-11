export interface CreateScheduleDto {
  id?: number;
  name: string;
  start_time: Date;
  end_time: Date;
  date: Date;
}

export interface ModifiedCreateScheduleDto
  extends Omit<CreateScheduleDto, 'start_time' | 'end_time' | 'date'> {
  start_time: string;
  end_time: string;
  date: string;
}

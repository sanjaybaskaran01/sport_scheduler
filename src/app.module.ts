import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SportScheduleModule } from './sport_schedule/sport_schedule.module';

@Module({
  imports: [UserModule, AuthModule, SportScheduleModule],
  providers: [],
})
export class AppModule {}

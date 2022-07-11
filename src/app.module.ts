import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SportScheduleModule } from './sport_schedule/sport_schedule.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SportScheduleModule,
    ConfigModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}

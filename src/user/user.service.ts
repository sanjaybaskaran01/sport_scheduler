import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModifiedUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const createdUser = await this.prisma.user.create({ data: userData });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002')
          throw new HttpException(
            'User with that email already exists',
            HttpStatus.BAD_REQUEST,
          );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // Omit<CreateScheduleDto
  // extends Omit<CreateScheduleDto, 'start_time' | 'end_time' | 'date'> {

  async findAll(): Promise<ModifiedUserDto[]> {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true, full_name: true },
    });
    return users;
  }

  async findOne(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // api/user/create
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // api/user
  @UseGuards(AuthenticateGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // api/user/login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return { status: 'success', message: 'Logged in' };
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // /api/user/create
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // api/user
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // api/user/login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return { msg: 'Logged In' };
  }
}

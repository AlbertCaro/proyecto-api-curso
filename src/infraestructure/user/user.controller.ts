import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetAllUsers } from '../../domain/usecases/get-all-users.service';
import { User } from '../../domain/models/user.model';
import { UserWriteDto } from './dto/user-write.dto';
import { CreateUser } from '../../domain/usecases/create-user.usecase';
import { UserReadDto } from './dto/user-read.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsers: GetAllUsers,
    private readonly createUser: CreateUser,
  ) {}

  @Get()
  async getAll(): Promise<UserReadDto[]> {
    const users = await this.getAllUsers.execute();

    return users.map((user: User) => user.toReadDto());
  }

  @Post()
  async create(@Body() user: UserWriteDto): Promise<UserReadDto> {
    const createdUser = await this.createUser.execute(user.toDomain());

    return createdUser.toReadDto();
  }
}

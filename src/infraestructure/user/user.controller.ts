import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetAllUsers } from '../../domain/usecases/user/get-all-users.usecase';
import { User } from '../../domain/models/user.model';
import { UserWriteDto } from './dto/user-write.dto';
import { CreateUser } from '../../domain/usecases/user/create-user.usecase';
import { UserReadDto } from './dto/user-read.dto';
import { UpdateUser } from '../../domain/usecases/user/update-user.usecase';
import { GetUserById } from '../../domain/usecases/user/get-user-by-id.usecase';
import { DeleteUser } from '../../domain/usecases/user/delete-user.usecase';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(
    private readonly getAllUsers: GetAllUsers,
    private readonly getUserById: GetUserById,
    private readonly createUser: CreateUser,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
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

  @Get(':id')
  async getById(@Param('id') id: number): Promise<UserReadDto> {
    const user = await this.getUserById.execute(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user.toReadDto();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UserWriteDto,
  ): Promise<UserReadDto> {
    const user = await this.updateUser.execute(id, data.toDomain());

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user.toReadDto();
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UserReadDto> {
    const user = await this.deleteUser.execute(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user.toReadDto();
  }
}

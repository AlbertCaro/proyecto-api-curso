import { Controller, Get } from '@nestjs/common';
import { GetAllUsers } from '../../domain/usecases/getAllUsers';
import { User } from '../../domain/models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly getAllUsers: GetAllUsers) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.getAllUsers.execute();
  }
}

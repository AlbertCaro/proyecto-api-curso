import { Injectable } from '@nestjs/common';
import { User } from './database/user.entity';

@Injectable()
export class UserRepository {
  async fetchAll() {
    const users = await User.find();

    return users.map((user) => user.toDomain());
  }
}

import { Injectable } from '@nestjs/common';
import { User as UserEntity } from './database/entity/user.entity';
import { User } from '../domain/models/user.model';

@Injectable()
export class UserRepository {
  async fetchAll() {
    const users = await UserEntity.find();

    return users.map((user) => user.toDomain());
  }

  async create(user: User) {
    const entity = user.toDatabase();

    await entity.save();

    return entity.toDomain();
  }
}

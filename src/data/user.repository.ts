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

  async findOneByEmail(email: string) {
    return (await UserEntity.findOne({ where: { correo: email } }))?.toDomain();
  }

  async findById(id: number) {
    return (await UserEntity.findOneBy({ id }))?.toDomain();
  }

  async update(user: User) {
    const entity = user.toDatabase();

    await entity.save();
  }

  async delete(user: User) {
    await user.toDatabase().remove();
  }
}

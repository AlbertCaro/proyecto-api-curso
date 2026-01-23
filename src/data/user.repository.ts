import { Injectable } from '@nestjs/common';
import { Usuario } from './database/entity/user.entity';
import { User } from '../domain/models/user.model';

@Injectable()
export class UserRepository {
  async fetchAll() {
    const users = await Usuario.find();

    return users.map((user) => user.toDomain());
  }

  async create(user: User) {
    const entity = user.toDatabase();

    await entity.save();

    return entity.toDomain();
  }

  async findOneByEmail(email: string) {
    return (await Usuario.findOne({ where: { correo: email } }))?.toDomain();
  }

  async findById(id: number) {
    return (await Usuario.findOneBy({ id }))?.toDomain();
  }

  async update(user: User) {
    const entity = user.toDatabase();

    await entity.save();
  }

  async delete(user: User) {
    await user.toDatabase().remove();
  }

  async findByCode(code: number) {
    return (await Usuario.findOneBy({ codigo: code }))?.toDomain();
  }
}

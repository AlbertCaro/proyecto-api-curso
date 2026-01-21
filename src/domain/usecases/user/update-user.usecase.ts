import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../data/user.repository';
import { GetUserById } from './get-user-by-id.usecase';
import { User } from '../../models/user.model';

@Injectable()
export class UpdateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly getUserById: GetUserById,
  ) {}

  async execute(id: number, newUser: User): Promise<User | null> {
    const user = await this.getUserById.execute(id);

    if (!user) {
      return null;
    }

    user.correo = newUser.correo;
    user.nombres = newUser.nombres;
    user.apellidos = newUser.apellidos;
    user.password = newUser.password;

    await this.repository.update(user);

    return user;
  }
}

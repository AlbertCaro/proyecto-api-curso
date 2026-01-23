import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../data/user.repository';
import { GetUserById } from './get-user-by-id.usecase';
import { User } from '../../models/user.model';
import { EncrypterService } from '../../../core/common/encrypter.service';

@Injectable()
export class UpdateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly getUserById: GetUserById,
    private readonly encrypterService: EncrypterService,
  ) {}

  async execute(id: number, newUser: User): Promise<User | null> {
    const user = await this.getUserById.execute(id);

    if (!user) {
      return null;
    }

    user.correo = newUser.correo;
    user.nombres = newUser.nombres;
    user.apellidos = newUser.apellidos;
    user.password = await this.encrypterService.encrypt(newUser.password);

    await this.repository.update(user);

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../data/user.repository';
import { User } from '../models/user.model';
import { EncrypterService } from '../../core/encrypter.service';

@Injectable()
export class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypterService: EncrypterService,
  ) {}

  async execute(user: User): Promise<User> {
    user.password = await this.encrypterService.encrypt(user.password);

    return this.userRepository.create(user);
  }
}

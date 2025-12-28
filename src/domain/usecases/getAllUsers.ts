import { UserRepository } from '../../data/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.fetchAll();
  }
}

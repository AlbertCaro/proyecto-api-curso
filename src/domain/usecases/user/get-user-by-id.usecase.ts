import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../data/user.repository';

@Injectable()
export class GetUserById {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly repository: UserRepository
  ) {}

  async execute(id: number) {
    return await this.repository.findById(id);
  }
}

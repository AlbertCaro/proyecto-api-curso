import { Module } from '@nestjs/common';
import { UserController } from '../infraestructure/user/user.controller';
import { GetAllUsers } from '../domain/usecases/getAllUsers';
import { UserRepository } from '../data/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, GetAllUsers],
})
export class UserModule {}

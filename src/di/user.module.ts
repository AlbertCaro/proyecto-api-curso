import { Module } from '@nestjs/common';
import { UserController } from '../infraestructure/user/user.controller';
import { GetAllUsers } from '../domain/usecases/user/get-all-users.usecase';
import { UserRepository } from '../data/user.repository';
import { CreateUser } from '../domain/usecases/user/create-user.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/database/entity/user.entity';
import { EncrypterService } from '../core/common/encrypter.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, GetAllUsers, CreateUser, EncrypterService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from '../infraestructure/user/user.controller';
import { GetAllUsers } from '../domain/usecases/get-all-users.service';
import { UserRepository } from '../data/user.repository';
import { CreateUser } from '../domain/usecases/create-user.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/database/entity/user.entity';
import { EncrypterService } from '../core/encrypter.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, GetAllUsers, CreateUser, EncrypterService],
})
export class UserModule {}

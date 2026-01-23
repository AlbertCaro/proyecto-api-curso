import { Module } from '@nestjs/common';
import { UserController } from '../infraestructure/user/user.controller';
import { GetAllUsers } from '../domain/usecases/user/get-all-users.usecase';
import { UserRepository } from '../data/user.repository';
import { CreateUser } from '../domain/usecases/user/create-user.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../data/database/entity/user.entity';
import { UpdateUser } from '../domain/usecases/user/update-user.usecase';
import { GetUserById } from '../domain/usecases/user/get-user-by-id.usecase';
import { DeleteUser } from '../domain/usecases/user/delete-user.usecase';
import { GetUserByEmail } from '../domain/usecases/user/get-user-by-email.usecase';
import { CommonModule } from './common.module';
import { UniqueEmailValidator } from '../infraestructure/user/validator/unique-email.validator';
import { GetUserByCode } from '../domain/usecases/user/get-user-by-code.usecase';
import { UniqueCodeValidator } from '../infraestructure/user/validator/unique-code.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), CommonModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    GetAllUsers,
    CreateUser,
    GetUserById,
    GetUserByEmail,
    GetUserByCode,
    UpdateUser,
    DeleteUser,
    UniqueEmailValidator,
    UniqueCodeValidator,
  ],
  exports: [GetUserByEmail],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '../core/auth/token.service';
import { AuthController } from '../infraestructure/auth/auth.controller';
import { Login } from '../domain/usecases/auth/login.usecase';
import { UserRepository } from '../data/user.repository';
import { EncrypterService } from '../core/common/encrypter.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [TokenService, Login, UserRepository, EncrypterService],
  controllers: [AuthController],
})
export class AuthModule {}

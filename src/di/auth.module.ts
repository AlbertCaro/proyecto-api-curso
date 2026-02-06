import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '../core/auth/token.service';
import { AuthController } from '../infraestructure/auth/auth.controller';
import { Login } from '../domain/usecases/auth/login.usecase';
import { UserRepository } from '../data/user.repository';
import { EncrypterService } from '../core/common/encrypter.service';
import { JwtStrategy } from '../infraestructure/auth/jwt.strategy';
import { GetAuthenticatedUser } from 'src/domain/usecases/auth/get-authenticated-user.usecase';
import { UserContextService } from 'src/core/auth/user-context.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    TokenService,
    UserContextService,
    Login,
    GetAuthenticatedUser,
    UserRepository,
    EncrypterService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../data/user.repository';
import { EncrypterService } from '../../../core/common/encrypter.service';
import { TokenService } from '../../../core/auth/token.service';
import { LoginCredentialsDto } from '../../../infraestructure/auth/dto/login-credentials.dto';

@Injectable()
export class Login {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly encrypterService: EncrypterService,
  ) {}

  async execute(login: LoginCredentialsDto) {
    const user = await this.userRepository.findOneByEmail(login.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await this.encrypterService.compare(
      login.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.tokenService.getToken(user);
  }
}

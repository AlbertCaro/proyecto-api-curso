import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginCredentials } from '../../models/login-credentials.model';
import { UserRepository } from '../../../data/user.repository';
import { EncrypterService } from '../../../core/common/encrypter.service';
import { TokenService } from '../../../core/auth/token.service';

@Injectable()
export class Login {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly encrypterService: EncrypterService,
  ) {}

  async execute(login: LoginCredentials) {
    const user = await this.userRepository.findOneByEmail(login.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    console.log(login);
    console.log(user);

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

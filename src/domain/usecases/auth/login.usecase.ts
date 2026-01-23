import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncrypterService } from '../../../core/common/encrypter.service';
import { TokenService } from '../../../core/auth/token.service';
import { LoginCredentialsDto } from '../../../infraestructure/auth/dto/login-credentials.dto';
import { GetUserByEmail } from '../user/get-user-by-email.usecase';

@Injectable()
export class Login {
  constructor(
    private readonly tokenService: TokenService,
    private readonly encrypterService: EncrypterService,
    private readonly getUserByEmail: GetUserByEmail,
  ) {}

  async execute(login: LoginCredentialsDto) {
    const user = await this.getUserByEmail.execute(login.email);

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

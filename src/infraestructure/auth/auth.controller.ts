import { Body, Controller, Post } from '@nestjs/common';
import { Login } from '../../domain/usecases/auth/login.usecase';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('login')
  async loginRoute(@Body() login: LoginCredentialsDto) {
    const token = await this.login.execute(login);

    return new TokenDto('Logged in', token);
  }
}

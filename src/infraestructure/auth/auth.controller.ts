import { Body, Controller, Post } from '@nestjs/common';
import { Login } from '../../domain/usecases/auth/login.usecase';
import { LoginCredentials } from '../../domain/models/login-credentials.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('login')
  async loginRoute(@Body() loginCredentials: LoginCredentials) {
    return this.login.execute(loginCredentials);
  }
}

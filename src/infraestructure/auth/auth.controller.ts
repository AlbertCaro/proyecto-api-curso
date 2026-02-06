import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Login } from '../../domain/usecases/auth/login.usecase';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { TokenDto } from './dto/token.dto';
import { GetAuthenticatedUser } from 'src/domain/usecases/auth/get-authenticated-user.usecase';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: Login,
    private readonly getAuthenticatedUser: GetAuthenticatedUser,
  ) {}

  @Post('login')
  async loginRoute(@Body() login: LoginCredentialsDto) {
    const token = await this.login.execute(login);

    return new TokenDto('Logged in', token);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile() {
    const user = await this.getAuthenticatedUser.execute()
    return user?.toReadDto()
  }
}

import { User } from '../../domain/models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async getToken(user: User) {
    return await this.jwtService.signAsync({ id: user.id });
  }
}

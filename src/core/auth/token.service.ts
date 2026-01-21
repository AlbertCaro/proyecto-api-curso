import { User } from '../../domain/models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async getToken(user: User) {
    const payload = {
      id: user.id,
      email: user.correo,
    };

    return await this.jwtService.signAsync(payload);
  }
}

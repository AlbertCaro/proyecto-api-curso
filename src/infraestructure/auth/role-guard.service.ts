import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../../domain/models/role.enum';
import { ROLES_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { GetUserById } from '../../domain/usecases/user/get-user-by-id.usecase';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly getUserById: GetUserById,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user: payload } = context.switchToHttp().getRequest();

    const user = await this.getUserById.execute(payload.id);

    if (user === undefined) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}

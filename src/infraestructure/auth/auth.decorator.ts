import { Role } from '../../domain/models/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Auth = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

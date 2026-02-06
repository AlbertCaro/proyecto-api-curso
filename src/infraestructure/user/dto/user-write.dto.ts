import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../../domain/models/user.model';
import { PasswordMatch } from '../validator/password.validator';
import { UniqueEmail } from '../validator/unique-email.validator';
import { Role } from '../../../domain/models/role.enum';
import { UniqueCode } from '../validator/unique-code.validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class UserWriteDto {
  @ApiHideProperty()
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  names: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @UniqueEmail()
  email: string;

  @IsNotEmpty()
  @PasswordMatch()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @UniqueCode()
  code: number;

  toDomain() {
    const model = new User();

    model.names = this.names;
    model.lastName = this.lastName;
    model.email = this.email;
    model.password = this.password;
    model.role = this.role;
    model.code = this.code;

    return model;
  }
}

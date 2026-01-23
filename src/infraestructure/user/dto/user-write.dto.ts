import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../../domain/models/user.model';
import { PasswordMatch } from '../validator/password.validator';

export class UserWriteDto {
  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  apellidos: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @PasswordMatch()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  toDomain() {
    const model = new User();

    model.nombres = this.nombres;
    model.apellidos = this.apellidos;
    model.correo = this.correo;
    model.password = this.password;

    return model;
  }
}

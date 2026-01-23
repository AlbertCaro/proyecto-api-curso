import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { GetUserByEmail } from '../../../domain/usecases/user/get-user-by-email.usecase';

@Injectable()
@ValidatorConstraint({ name: 'UniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly getUserByEmail: GetUserByEmail) {}

  async validate(email: string, _?: ValidationArguments): Promise<boolean> {
    const user = await this.getUserByEmail.execute(email);

    return user === undefined;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `El email "${args?.value}" ya se encuentra registrado.`;
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
}

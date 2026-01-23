import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { GetUserByCode } from '../../../domain/usecases/user/get-user-by-code.usecase';

@Injectable()
@ValidatorConstraint({ name: 'UniqueCode', async: true })
export class UniqueCodeValidator implements ValidatorConstraintInterface {
  constructor(private readonly getUserByCode: GetUserByCode) {}

  async validate(code: number, _?: ValidationArguments): Promise<boolean> {
    const user = await this.getUserByCode.execute(code);

    return user === undefined;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `Ya existe un usuario con el codigo "${args?.value}".`;
  }
}

export function UniqueCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueCodeValidator,
    });
  };
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordMatch' })
export class PasswordMatchValidator implements ValidatorConstraintInterface {
  validate(
    password: string,
    args?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const user: any = args?.object;

    return password === user.confirmPassword;
  }
  defaultMessage?(_?: ValidationArguments): string {
    return 'La contraseñas no coinciden.';
  }
}

export function PasswordMatch(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordMatchValidator,
    });
  };
}

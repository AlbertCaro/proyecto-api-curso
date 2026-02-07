import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GetUserById } from "src/domain/usecases/user/get-user-by-id.usecase";

@Injectable()
@ValidatorConstraint({ name: 'IsUserId', async: true })
export class IsUserIdValidator implements ValidatorConstraintInterface {
  constructor(private readonly getUserById: GetUserById) {}

  async validate(id: number, _?: ValidationArguments): Promise<boolean> {
    const user = await this.getUserById.execute(id);
    
    return user !== undefined;
  }
  defaultMessage?(_?: ValidationArguments): string {
    return `El usuario especificado no existe`;
  }
}

export function IsUserId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserIdValidator,
    });
  };
}
import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensurePasswordHasValidLength(value);
  }

  private ensurePasswordHasValidLength(value: string) {
    if (value.length < 8 || value.length > 16) {
      throw new Error(`The password has less than 8 characters or more than 16 characters`);
    }
  }
}
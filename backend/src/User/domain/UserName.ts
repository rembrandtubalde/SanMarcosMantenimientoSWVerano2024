import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string) {
    if (value.length < 3 || value.length > 25) {
      throw new Error(`The user name <${value}> has less then 3 characters or more than 25 characters`);
    }
  }
}
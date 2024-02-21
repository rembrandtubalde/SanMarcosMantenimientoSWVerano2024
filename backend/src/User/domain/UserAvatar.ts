import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

export class UserAvatar extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

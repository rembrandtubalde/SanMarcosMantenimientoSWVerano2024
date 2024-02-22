import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

const defaultAvatarImagePath = 'https://res.cloudinary.com/ashel-root/image/upload/v1642319099/Profesores/default_fvdimb.jpg'

export class UserAvatar extends StringValueObject {
  constructor(value: string) {
    super(value ?? defaultAvatarImagePath);
  }
}

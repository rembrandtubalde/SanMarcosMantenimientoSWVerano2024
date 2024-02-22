import { UserAvatar } from "../../../src/User/domain/UserAvatar";
import { UserCountry } from "../../../src/User/domain/UserCountry";
import { UserEmail } from "../../../src/User/domain/UserEmail";
import { UserId } from "../../../src/User/domain/UserId";
import { UserLastName } from "../../../src/User/domain/UserLastName";
import { UserName } from "../../../src/User/domain/UserName";
import { UserPassword } from "../../../src/User/domain/UserPassword";
import { User } from "../../../src/User/domain/user";

export class UserMother {
  static create(
    id: UserId,
    name: UserName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword,
    country: UserCountry,
    avatar: UserAvatar,
    hashedPassword: string
  ): User {
    return new User(
      id,
      name,
      lastName,
      email,
      password,
      country,
      avatar,
      hashedPassword
    )
  }
}
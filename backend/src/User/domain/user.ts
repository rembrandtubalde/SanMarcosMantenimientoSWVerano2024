import { BaseEntity } from "../../Shared/domain/BaseEntity";

export class User extends BaseEntity {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly country: string;
  readonly avatar: string;

  constructor(
    id: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    country: string,
    avatar: string
  ) {
    super();
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.country = country;
    this.avatar = avatar;
  }

  static create(
    id: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    country: string,
    avatar: string
  ) {
      const user = new User(id, name, lastName, email, password, passwordConfirm, country, avatar);

      return user;
  }

  toPrimitives() {
    return {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      country: this.country,
      avatar: this.avatar
    }
  }
}
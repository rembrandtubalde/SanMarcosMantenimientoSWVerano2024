export class User {
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirm: string;
  readonly country: string;
  readonly avatar: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    country: string,
    avatar: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.country = country;
    this.avatar = avatar;
  }

  static create(
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    country: string,
    avatar: string
  ) {
      const user = new User(name, lastName, email, password, passwordConfirm, country, avatar);

      return user;
  }
}
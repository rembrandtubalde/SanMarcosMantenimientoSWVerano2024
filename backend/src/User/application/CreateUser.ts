import { UserRepository } from "../domain/user.repository";
import { User } from '../domain/user';
import { PasswordEncryptor } from "../domain/PasswordEncryptor";

export interface IUserData {
  id: string,
  name: string,
  lastName: string,
  email: string,
  password: string,
  passwordConfirm: string,
  country: string,
  avatar: string
}

export class CreateUser {
  constructor(
    private repository: UserRepository,
    private passwordEncryptor: PasswordEncryptor
  ) {}

  async execute(props: IUserData): Promise<any> {
    this.ensurePasswordsMatch(props.password, props.passwordConfirm);

    const user = User.fromPrimitives({
      id: props.id,
      name: props.name,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      country: props.country,
      avatar: props.avatar,
      hashedPassword: await this.passwordEncryptor.encrypt(props.password)
    })

    await this.repository.save(user);

    return user.toPrimitives();
  }

  private ensurePasswordsMatch(password: string, passwordToConfirm: string) {
    if (password !== passwordToConfirm) {
      throw new Error("Passwords doesn't match")
    }
  }
}
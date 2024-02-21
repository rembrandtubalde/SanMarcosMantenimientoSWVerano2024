import { UserRepository } from "../domain/user.repository";
import { User } from '../domain/user';

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
  constructor(private repository: UserRepository) {}

  async execute(props: IUserData): Promise<void> {
    this.ensurePasswordsMatch(props.password, props.passwordConfirm);

    const user = User.fromPrimitives({
      id: props.id,
      name: props.name,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      country: props.country,
      avatar: props.avatar
    })

    await this.repository.save(user);
  }

  private ensurePasswordsMatch(password: string, passwordToConfirm) {
    if (password !== passwordToConfirm) {
      throw new Error("Passwords doesn't match")
    }
  }
}
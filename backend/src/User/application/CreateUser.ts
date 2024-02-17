import { UserRepository } from "../domain/user.repository";
import { User } from '../domain/user';

export class CreateUser {
  constructor(private repository: UserRepository) {}

  async execute(props: {
    id: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string,
    country: string,
    avatar: string
  }): Promise<void> {
    const user = User.create(
      props.id,
      props.name,
      props.lastName,
      props.email,
      props.password,
      props.passwordConfirm,
      props.country,
      props.avatar
    );

    await this.repository.save(user);
  }
}
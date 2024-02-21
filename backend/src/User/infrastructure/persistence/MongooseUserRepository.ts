import { MongooseRepository } from "../../../Shared/infrastructure/mongoose/MongooseRepository";
import { User } from "../../domain/user";
import { UserRepository } from "../../domain/user.repository";

export class MongooseUserRepository extends MongooseRepository<User> implements UserRepository {
  public save(user: User): Promise<void> {
    return this.persist(user.id.value, user);
  }

  protected collectionName(): string {
    return 'users'
  }
}
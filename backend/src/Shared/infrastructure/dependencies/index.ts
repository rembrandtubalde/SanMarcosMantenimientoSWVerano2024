import { MongoClientFactory } from "../mongoose/MongooseClientFactory";
import { MongooseConfigFactory } from "../mongoose/MongooseConfigFactory";
import { MongooseUserRepository } from "../../../User/infrastructure/persistence/MongooseUserRepository";
import { CreateUser } from "../../../User/application/CreateUser";
import { UserPutController } from "../../../api/controllers/UserPutController";

const mongoConfig = MongooseConfigFactory.createConfig();
const mongoClient = MongoClientFactory.createClient(mongoConfig);

// User Dependencies
const mongoUserRepository = new MongooseUserRepository(mongoClient);
const createUserUseCase = new CreateUser(mongoUserRepository);
const userPutController = new UserPutController();

export {
  createUserUseCase,
  userPutController
}
import { MongoClientFactory } from '../mongoose/MongooseClientFactory';
import { MongooseConfigFactory } from '../mongoose/MongooseConfigFactory';
import { MongooseUserRepository } from '../../../User/infrastructure/persistence/MongooseUserRepository';
import { CreateUser } from '../../../User/application/CreateUser';
import { UserPutController } from '../../../../api/controllers/UserPutController';
import { BcryptPasswordEncryptor } from '../../../User/infrastructure/BcryptPasswordEncryptor';

const mongoConfig = MongooseConfigFactory.createConfig();
const mongoClient = MongoClientFactory.createClient(mongoConfig);

// User Dependencies
const mongoUserRepository = new MongooseUserRepository(mongoClient);
const encryptor = new BcryptPasswordEncryptor();
const createUserUseCase = new CreateUser(mongoUserRepository, encryptor);
const userPutController = new UserPutController();

export { createUserUseCase, userPutController };

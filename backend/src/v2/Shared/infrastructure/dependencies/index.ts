import { MongoClientFactory } from '../mongoose/MongooseClientFactory';
import { MongooseConfigFactory } from '../mongoose/MongooseConfigFactory';
import { MongooseUserRepository } from '../../../User/infrastructure/persistence/MongooseUserRepository';
import { CreateUser } from '../../../User/application/CreateUser';
import { UserPutController } from '../../../../api/controllers/UserPutController';
import { BcryptPasswordEncryptor } from '../../../User/infrastructure/BcryptPasswordEncryptor';
import { MongooseFavoriteRepository } from '../../../Favorite/infrastructure/pesistence/MongooseFavoriteRepository';
import { SaveFavorite } from '../../../Favorite/application/SaveFavorite';
import { SaveFavoriteController } from '../../../../api/controllers/SaveFavoriteController';
import { UserFavoritesController } from '../../../../api/controllers/UserFavoritesController';
import { DeleteFavorite } from '../../../Favorite/application/DeleteFavorite';
import { DeleteFavoriteController } from '../../../../api/controllers/DeleteFavoriteController';

const mongoConfig = MongooseConfigFactory.createConfig();
const mongoClient = MongoClientFactory.createClient(mongoConfig);

// User Dependencies
const mongoUserRepository = new MongooseUserRepository(mongoClient);
const encryptor = new BcryptPasswordEncryptor();
const createUserUseCase = new CreateUser(mongoUserRepository, encryptor);
const userPutController = new UserPutController();

// Favorite Dependencies
const mongoFavoriteRepository = new MongooseFavoriteRepository(mongoClient);
const saveFavoriteUseCase = new SaveFavorite(mongoFavoriteRepository);
const saveFavoriteController = new SaveFavoriteController();
const findFavoritesByUser = new FindFavoritePlaces(mongoFavoriteRepository);
const userFavoritesController = new UserFavoritesController();
const deleteFavoriteUseCase = new DeleteFavorite(mongoFavoriteRepository);
const deleteFavoriteController = new DeleteFavoriteController();

export {
	createUserUseCase,
	userPutController,
	saveFavoriteUseCase,
	saveFavoriteController,
	findFavoritesByUser,
	userFavoritesController,
	deleteFavoriteUseCase,
	deleteFavoriteController,
};

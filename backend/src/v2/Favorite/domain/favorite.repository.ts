import { UserId } from '../../User/domain/UserId';
import { Favorite } from './Favorite';
import { FavoriteId } from './FavoriteId';

export interface FavoriteRepository {
	save(favorite: Favorite): Promise<void>;
	findByUser(userId: string): Promise<Favorite[]>;
	remove(favoriteId: FavoriteId): Promise<void>;
}

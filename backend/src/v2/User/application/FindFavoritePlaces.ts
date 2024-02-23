import { Favorite } from '../../Favorite/domain/Favorite';
import { FavoriteRepository } from '../../Favorite/domain/favorite.repository';

export class FindFavoritePlaces {
	constructor(private favoriteRepository: FavoriteRepository) {}

	async execute(userId: string): Promise<Favorite[]> {
		return await this.favoriteRepository.findByUser(userId);
	}
}

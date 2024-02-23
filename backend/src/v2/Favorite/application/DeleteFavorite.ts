import { FavoriteId } from '../domain/FavoriteId';
import { FavoriteRepository } from '../domain/favorite.repository';

export class DeleteFavorite {
	constructor(private repository: FavoriteRepository) {}

	async execute(favoriteId: string): Promise<void> {
		await this.repository.remove(new FavoriteId(favoriteId));
	}
}

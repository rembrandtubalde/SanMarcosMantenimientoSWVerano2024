import { MongooseRepository } from '../../../Shared/infrastructure/mongoose/MongooseRepository';
import { UserId } from '../../../User/domain/UserId';
import { Favorite } from '../../domain/Favorite';
import { FavoriteId } from '../../domain/FavoriteId';
import { FavoritePhoto } from '../../domain/FavoritePhoto';
import { FavoriteReview } from '../../domain/FavoriteReview';
import { FavoriteRepository } from '../../domain/favorite.repository';

interface FavoriteDocument {
	_id: string;
	place: string;
	name: string;
	latitude: number;
	phone_number: string;
	longitude: number;
	rating: number;
	url_google_maps: string;
	website: string;
	address: string;
	photos: FavoritePhoto[];
	reviews: FavoriteReview[];
	userId: string;
}

export class MongooseFavoriteRepository extends MongooseRepository<Favorite> implements FavoriteRepository {
	protected collectionName(): string {
		return 'favorites';
	}

	async save(favorite: Favorite): Promise<void> {
		await this.persist(favorite.id.value, favorite);
	}

	async findByUser(userId: string): Promise<Favorite[]> {
		const collection = await this.collection();
		const documents = await collection.find<FavoriteDocument>({ userId }, {}).toArray();

		return documents.map<Favorite>((document) => {
			const favorite = Favorite.create(
				new FavoriteId(document._id),
				document.place,
				document.name,
				document.latitude,
				document.phone_number,
				document.longitude,
				document.rating,
				document.url_google_maps,
				document.website,
				document.address,
				document.userId,
			);

			favorite.setPhotos(document.photos);
			favorite.setReviews(document.reviews);

			console.log(favorite);

			return favorite.toPrimitives();
		});
	}

	async remove(favoriteId: FavoriteId): Promise<void> {
		await this.delete(favoriteId.value);
	}
}

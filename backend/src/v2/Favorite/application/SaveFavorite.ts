import { Favorite } from '../domain/Favorite';
import { FavoriteId } from '../domain/FavoriteId';
import { FavoritePhoto } from '../domain/FavoritePhoto';
import { FavoriteReview } from '../domain/FavoriteReview';
import { FavoriteRepository } from '../domain/favorite.repository';

export interface IFavoriteData {
	id: string;
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

export class SaveFavorite {
	constructor(private repository: FavoriteRepository) {}

	async execute(props: IFavoriteData): Promise<any> {
		const favorite = new Favorite(
			new FavoriteId(props.id),
			props.place,
			props.name,
			props.latitude,
			props.phone_number,
			props.longitude,
			props.rating,
			props.url_google_maps,
			props.website,
			props.address,
			props.userId,
		);

		favorite.setPhotos(props.photos);
		favorite.setReviews(props.reviews);

		await this.repository.save(favorite);

		return favorite.toPrimitives();
	}
}

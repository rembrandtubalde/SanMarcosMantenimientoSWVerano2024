import { BaseEntity } from '../../Shared/domain/BaseEntity';
import { FavoriteId } from './FavoriteId';
import { FavoritePhoto } from './FavoritePhoto';
import { FavoriteReview } from './FavoriteReview';

export class Favorite extends BaseEntity {
	readonly id: FavoriteId;
	readonly place: String;
	readonly name: String;
	readonly latitude: Number;
	readonly phone_number: String;
	readonly longitude: Number;
	readonly rating: Number;
	readonly url_google_maps: String;
	readonly website: String;
	readonly address: String;
	readonly userId: string;
	photos: FavoritePhoto[];
	reviews: FavoriteReview[];

	constructor(
		id: FavoriteId,
		place: String,
		name: String,
		latitude: Number,
		phone_number: String,
		longitude: Number,
		rating: Number,
		url_google_maps: String,
		website: String,
		address: String,
		userId: string,
	) {
		super();
		this.id = id;
		this.place = place;
		this.name = name;
		this.latitude = latitude;
		this.phone_number = phone_number;
		this.longitude = longitude;
		this.rating = rating;
		this.url_google_maps = url_google_maps;
		this.website = website;
		this.address = address;
		this.userId = userId;
	}

	static create(
		id: FavoriteId,
		place: string,
		name: string,
		latitude: number,
		phone_number: string,
		longitude: number,
		rating: number,
		url_google_maps: string,
		website: string,
		address: string,
		userId: string,
	): Favorite {
		const favorite = new Favorite(
			id,
			place,
			name,
			latitude,
			phone_number,
			longitude,
			rating,
			url_google_maps,
			website,
			address,
			userId,
		);

		return favorite;
	}

	setPhotos(photos: FavoritePhoto[]) {
		this.photos = photos.map(
			(photo) => new FavoritePhoto(photo.height, photo.width, photo.photo_reference, photo.html_attributions),
		);
	}

	setReviews(reviews: FavoriteReview[]) {
		this.reviews = reviews.map(
			(review) =>
				new FavoriteReview(
					review.author_name,
					review.author_url,
					review.language,
					review.profile_photo_url,
					review.rating,
					review.relative_time_description,
					review.text,
					review.time,
				),
		);
	}

	toPrimitives(): any {
		return {
			id: this.id.value,
			place: this.place,
			name: this.name,
			latitude: this.latitude,
			phone_number: this.phone_number,
			longitude: this.longitude,
			rating: this.rating,
			url_google_maps: this.url_google_maps,
			website: this.website,
			address: this.address,
			photos: this.photos.map((photo) => photo.toPrimitives()),
			reviews: this.reviews.map((review) => review.toPrimitives()),
			userId: this.userId,
		};
	}
}

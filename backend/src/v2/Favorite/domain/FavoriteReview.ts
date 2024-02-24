import { BaseEntity } from '../../Shared/domain/BaseEntity';

export class FavoriteReview extends BaseEntity {
	readonly author_name: string;
	readonly author_url: string;
	readonly language: string;
	readonly profile_photo_url: string;
	readonly rating: number;
	readonly relative_time_description: string;
	readonly text: string;
	readonly time: number;

	constructor(
		author_name: string,
		author_url: string,
		language: string,
		profile_photo_url: string,
		rating: number,
		relative_time_description: string,
		text: string,
		time: number,
	) {
		super();
		this.author_name = author_name;
		this.author_url = author_url;
		this.language = language;
		this.profile_photo_url = profile_photo_url;
		this.rating = rating;
		this.relative_time_description = relative_time_description;
		this.text = text;
		this.time = time;
	}

	toPrimitives(): any {
		return {
			author_name: this.author_name,
			author_url: this.author_url,
			language: this.language,
			profile_photo_url: this.profile_photo_url,
			rating: this.rating,
			relative_time_description: this.relative_time_description,
			text: this.text,
			time: this.time,
		};
	}
}

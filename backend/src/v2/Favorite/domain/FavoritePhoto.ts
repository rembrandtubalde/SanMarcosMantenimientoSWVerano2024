import { BaseEntity } from '../../Shared/domain/BaseEntity';

export class FavoritePhoto extends BaseEntity {
	readonly height: number;
	readonly width: number;
	readonly photo_reference: string;
	readonly html_attributions: string[];

	constructor(height: number, width: number, photo_reference: string, html_attributions: string[]) {
		super();
		this.height = height;
		this.width = width;
		this.photo_reference = photo_reference;
		this.html_attributions = html_attributions;
	}

	toPrimitives(): any {
		return {
			heigh: this.height,
			width: this.width,
			photo_reference: this.photo_reference,
			html_attributions: this.html_attributions,
		};
	}
}

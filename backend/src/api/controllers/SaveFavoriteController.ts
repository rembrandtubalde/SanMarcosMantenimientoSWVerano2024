import { Request, Response, raw } from 'express';
import { Controller } from './Controller';
import { FavoritePhoto } from '../../v2/Favorite/domain/FavoritePhoto';
import { FavoriteReview } from '../../v2/Favorite/domain/FavoriteReview';
import { saveFavoriteUseCase } from '../../v2/Shared/infrastructure/dependencies';
import { Uuid } from '../../v2/Shared/domain/value-objects/Uuid';
import httpStatus from 'http-status';

export interface FavoriteDataRequest extends Request {
	body: {
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
	};
}

export class SaveFavoriteController implements Controller {
	async run(req: FavoriteDataRequest, res: Response, next: Function): Promise<void> {
		try {
			const {
				place,
				name,
				latitude,
				phone_number,
				longitude,
				rating,
				url_google_maps,
				website,
				address,
				photos,
				reviews,
				userId,
			} = req.body;

			const favorite = await saveFavoriteUseCase.execute({
				id: Uuid.random().value,
				place,
				name,
				latitude,
				phone_number,
				longitude,
				rating,
				url_google_maps,
				website,
				address,
				photos,
				reviews,
				userId,
			});

			res.status(httpStatus.CREATED).send({
				status: 'success',
				data: favorite,
			});
		} catch (error) {
			next(error);
		}
	}
}

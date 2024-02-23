import { Request, Response } from 'express';
import { Controller } from './Controller';
import { findFavoritesByUser } from '../../v2/Shared/infrastructure/dependencies';
import { Favorite } from '../../v2/Favorite/domain/Favorite';
import httpStatus from 'http-status';

export interface CustomRequest extends Request {
	params: {
		userId: string;
	};
}

export class UserFavoritesController implements Controller {
	async run(req: CustomRequest, res: Response, next: Function): Promise<any> {
		try {
			const { userId } = req.params;

			const favorites = await findFavoritesByUser.execute(userId);

			res.status(httpStatus.OK).send({
				status: 'success',
				data: favorites,
			});
		} catch (error) {
			next(error);
		}
	}
}

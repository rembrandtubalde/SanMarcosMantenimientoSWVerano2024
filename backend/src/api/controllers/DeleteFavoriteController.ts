import { Request, Response } from 'express';
import { Controller } from './Controller';
import { deleteFavoriteUseCase } from '../../v2/Shared/infrastructure/dependencies';
import httpStatus from 'http-status';

export interface CustomRequest extends Request {
	params: {
		favoriteId: string;
	};
}

export class DeleteFavoriteController implements Controller {
	async run(req: CustomRequest, res: Response, next: Function): Promise<any> {
		try {
			const { favoriteId } = req.params;

			await deleteFavoriteUseCase.execute(favoriteId);

			res.status(httpStatus.NO_CONTENT).send({
				status: 'success',
			});
		} catch (error) {
			next(error);
		}
	}
}

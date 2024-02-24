import { Request, Response } from 'express';
import { Controller } from './Controller';
import { findSavedDatesUseCase } from '../../v2/Shared/infrastructure/dependencies';
import httpStatus from 'http-status';

export interface CustomSavedDatesRequest extends Request {
	params: {
		userId: string;
	};
}

export class FindSavedDatesController implements Controller {
	async run(req: CustomSavedDatesRequest, res: Response, next: Function): Promise<void> {
		try {
			const { userId } = req.params;

			const dates = await findSavedDatesUseCase.execute(userId);

			res.status(httpStatus.OK).send({
				status: 'success',
				data: dates,
			});
		} catch (error) {
			next(error);
		}
	}
}

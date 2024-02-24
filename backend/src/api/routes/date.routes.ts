import { Router } from 'express';
import {
	findSavedDateController,
	findSavedDatesUseCase,
	saveDateController,
} from '../../v2/Shared/infrastructure/dependencies';

export const register = (router: Router) => {
	router.route('/api/v2/dates').post(saveDateController.run);
	router.route('/api/v2/dates/:userId').get(findSavedDateController.run);
};

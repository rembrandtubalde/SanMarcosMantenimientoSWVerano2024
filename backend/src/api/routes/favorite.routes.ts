import { Router } from 'express';
import {
	deleteFavoriteController,
	saveFavoriteController,
	userFavoritesController,
} from '../../v2/Shared/infrastructure/dependencies';

export const register = (router: Router) => {
	router.route('/api/v2/favorites').post(saveFavoriteController.run);
	router.route('/api/v2/favorites/:userId').get(userFavoritesController.run);
	router.route('/api/v2/favorites/:favoriteId').delete(deleteFavoriteController.run);
};

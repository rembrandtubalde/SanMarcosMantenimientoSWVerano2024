import { Router } from 'express';
import { register as userRoutesRegister } from './user.routes';
import { register as favoriteRoutesRegister } from './favorite.routes';

export const registerRoutes = (router: Router) => {
	userRoutesRegister(router);
	favoriteRoutesRegister(router);
};

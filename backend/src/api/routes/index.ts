import { Router } from 'express';
import { register as userRoutesRegister } from './user.routes';

export const registerRoutes = (router: Router) => {
	userRoutesRegister(router);
};

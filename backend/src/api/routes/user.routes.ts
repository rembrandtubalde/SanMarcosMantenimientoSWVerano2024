import { Response, Router } from 'express';
import { userPutController } from '../../v2/Shared/infrastructure/dependencies';
import upload from '../../config/multer.config';

export const register = (router: Router) => {
	router.route('/api/v2/auth/register').post(userPutController.run);
};

import { Response, Router } from 'express';
import { userPutController } from '../../Shared/infrastructure/dependencies';
import upload from '../../config/multer.config';

const router = Router();

router.route('/').post(userPutController.run);

// router.put('/:userId', upload.single('image'), UserCtrl.apiUpdateUser);

export default router;

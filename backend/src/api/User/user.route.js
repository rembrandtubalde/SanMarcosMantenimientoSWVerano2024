import { Router } from 'express';
import UserCtrl from './user.controller';
import upload from '../../config/multer.config';

const router = new Router();

router.route('/').post(UserCtrl.apiPostUser);

router.put('/:userId', upload.single('image'), UserCtrl.apiUpdateUser);

export default router;

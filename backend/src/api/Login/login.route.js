import { Router } from 'express';
import LoginCtrl from './login.controller';

const router = new Router();

router.route('/').post(LoginCtrl.apiLoginUser);
// router.route('/google').post(LoginCtrl.apiGoogleLogin);

export default router;

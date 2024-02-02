import { Router } from 'express';
import DateCtrl from './date.controller';

const router = new Router();

router.route('/:userId').get(DateCtrl.apiGetAllDatesByUser);
router.route('/').post(DateCtrl.apiPostDate);
router.route('/:dateId').get(DateCtrl.apiGetDateById);
router.route('/:dateId').delete(DateCtrl.apiDeleteDate);
// router.route('/:dateId').put(DateCtrl.apiUpdateDate);

export default router;

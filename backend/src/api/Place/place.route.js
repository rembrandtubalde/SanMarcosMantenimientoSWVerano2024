import { Router } from 'express';
import PlaceCtrl from './place.controller';

const router = new Router();

router.route('/').get(PlaceCtrl.apiGetPlaceInfo);

export default router;

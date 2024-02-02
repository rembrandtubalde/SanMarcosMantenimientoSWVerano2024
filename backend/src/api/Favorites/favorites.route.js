import { Router } from 'express';
import FavsCtrl from './favorites.controller';

const router = new Router();

router.route('/:userId').get(FavsCtrl.apiGetAllFavs);
router.route('/').post(FavsCtrl.apiPostFav);
router.route('/').get(FavsCtrl.apiGetfavs);
router.route('/:favoriteId').delete(FavsCtrl.apiDeleteFav);

export default router;

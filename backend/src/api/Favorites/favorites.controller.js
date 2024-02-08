/* eslint-disable consistent-return */
/* eslint-disable camelcase */

import Favs from './favorites';
import { User } from '../User';

export default class FavsController {
  static async apiGetAllFavs(req, res, next) {
    const { userId } = req.params;
    try {
      const favs = await User.find({ _id: userId }).populate('favorites');
      console.log(favs);

      return res.status(200).send({
        status: 'success',
        data: favs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async apiGetfavs(req, res, next) {
    try {
      const favs = await Favs.find({});

      return res.status(200).send({
        status: 'success',
        data: favs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async apiPostFav(req, res, next) {
    const { place, userId } = req.body;

    try {
      const user = await User.findById(userId);

      const newFav = new Favs({
        ...place,
        user_id: user.id,
      });

      const savedFav = await newFav.save();

      await User.findByIdAndUpdate(userId, {
        $push: {
          favorites: savedFav._id,
        },
      });

      return res.status(201).send({
        status: 'success',
        data: savedFav,
      });
    } catch (error) {
      next(error);
    }
  }

  static async apiDeleteFav(req, res, next) {
    const { favoritePlaceId } = req.params;

    try {
      const fav = await Favs.findOne({ place_id: favoritePlaceId });

      await User.findByIdAndUpdate(fav.user_id, {
        $pull: {
          favorites: fav._id,
        },
      });

      await Favs.findByIdAndDelete(fav._id);

      return res.status(204).send({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

/* eslint-disable consistent-return */
import { User } from '../User';
import Date from './date';

export default class DateController {
  static async apiGetAllDatesByUser(req, res, next) {
    const { userId } = req.params;

    try {
      const user = await User
        .findById(userId)
        .populate('dates');

      return res.status(200).send({
        status: 'success',
        data: user.dates,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async apiGetDateById(req, res, next) {
    const { dateId } = req.params;

    try {
      const date = await Date.findById(dateId);

      return res.status(200).send({
        status: 'success',
        data: date,
      });
    } catch (error) {
      next(error);
    }
  }

  static async apiPostDate(req, res, next) {
    const {
      userId, category, budget, placeId, expectedDate,
    } = req.body;

    try {
      const user = await User.findById(userId);

      const newDate = new Date({
        budget,
        user_id: user.id,
        category,
        place_id: placeId,
        expected_date: expectedDate,
      });
      console.log(newDate);
      const savedDate = await newDate.save();

      await User.findByIdAndUpdate(userId, {
        $push: {
          dates: savedDate._id,
        },
      });

      return res.status(201).send({
        status: 'success',
        data: savedDate,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async apiDeleteDate(req, res, next) {
    const { dateId } = req.params;

    try {
      const date = await Date.findById(dateId);

      await Date.findByIdAndDelete(dateId);

      await User.findByIdAndUpdate(date.user_id, {
        $pull: {
          dates: dateId,
        },
      });

      return res.status(204).send({
        status: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}

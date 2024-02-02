import User from './user';
import cloudinary from '../../config/cloudinary.config';

export default class UserController {
  // eslint-disable-next-line consistent-return
  static async apiPostUser(req, res, next) {
    const { body } = req;

    try {
      const user = new User({
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        country: body.country,
        password: body.password,
        passwordConfirm: body.passwordConfirm,
        avatar: body.avatar,
      });

      const savedUser = await user.save();

      return res.status(201).send({
        status: 'success',
        user: savedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async apiUpdateUser(req, res, next) {
    const { userId } = req.params;
    const { body } = req;

    try {
      console.log(body);
      let imageInfo;
      if (req.file) {
        imageInfo = await cloudinary.uploader.upload(req.file.path);
      }

      const imageUrl = imageInfo ? imageInfo.secure_url : body.avatar;

      const user = {
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        country: body.country,
        avatar: imageUrl,
        dates: body.dates,
        favorites: body.favorites,
      };

      const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });

      res.status(200).send({
        status: 'success',
        data: updatedUser,
      });
    } catch (error) {
      res.send(error);
      next(error);
    }
  }
}

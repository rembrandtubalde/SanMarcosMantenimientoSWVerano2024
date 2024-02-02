import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

import { User } from '../User';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET_CLIENT,
  'http://localhost:3001',
);

export default class LoginController {
  // eslint-disable-next-line consistent-return
  static async apiLoginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password);

      if (!user) {
        throw new Error('invalidUser');
      }

      if (!passwordCorrect) {
        throw new Error('invalidPassword');
      }

      const userForToken = {
        email,
        name: user.name,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      return res.status(200).send({
        status: 'success',
        token,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async apiGoogleLogin(req, res, next) {
    try {
      const { code } = req.body;
      console.log(code);

      // const ticket = await client.verifyIdToken({
      //   idToken: token,
      //   audience: process.env.GOOGLE_CLIENT_ID,
      // });
      // const { email } = ticket.getPayload();

      // const user = User.findOne({ email });
      const ticket = await client.getToken(code);

      // if (!user) throw new Error('invalidUser');
      console.log(ticket);

      res.status(200).send({
        data: ticket,
      });
    } catch (error) {
      next(error);
    }
  }
}

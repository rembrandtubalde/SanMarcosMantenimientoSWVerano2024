import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// config
import { config } from './config';

// routes
import { UserRoute } from './api/User';
import { LoginRoute } from './api/Login';
import { PlaceRoute } from './api/Place';
import { FavoritesRoute } from './api/Favorites';
import { DateRoute } from './api/Date';

// middlewares
import {
  logger, requestLogger, unknownEndpoint, errorHandler,
} from './middlewares';

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);

    logger.info('MongoDB connected succesfully');
  } catch (error) {
    logger.error('Some error has ocurred: ', error.message);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

app.use('/api/v1/dates', DateRoute);
app.use('/api/v1/favorites', FavoritesRoute);
app.use('/api/v1/placeinfo', PlaceRoute);
app.use('/api/v1/auth/register', UserRoute);
app.use('/api/v1/auth/login', LoginRoute);
app.use('/ping', (req, res) => res.send('pong!'));
app.use('/', (req, res) => res.send('Hi!'));

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;

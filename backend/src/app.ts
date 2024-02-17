import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as http from 'http';

// routes
import { UserRoute } from './api/User';
import { LoginRoute } from './api/Login';
import { PlaceRoute } from './api/Place';
import { FavoritesRoute } from './api/Favorites';
import { DateRoute } from './api/Date';
import userRoutes from './api/routes/user.routes';

// middlewares
import {
  logger, requestLogger, unknownEndpoint, errorHandler,
} from './middlewares';
import bodyParser from 'body-parser';

export class Server {
  private express: express.Express;
  private port: number;
  private httpServer?: http.Server;

  constructor(port: number) {
    this.port = port;
    this.express = express();
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(requestLogger);

    // Registrando las rutas de la API
    this.express.use('/api/v1/dates', DateRoute);
    this.express.use('/api/v1/favorites', FavoritesRoute);
    this.express.use('/api/v1/placeinfo', PlaceRoute);
    this.express.use('/api/v1/auth/register', userRoutes);
    this.express.use('/api/v1/auth/login', LoginRoute);
    this.express.use('/ping', (req, res) => res.send('pong!'));
    this.express.use('/', (req, res) => res.send('Hi!'));

    this.express.use(unknownEndpoint);
    this.express.use(errorHandler);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`API is running on http://localhost:${this.port}`)
      })
      resolve();
    })
  }

  getHttpServer() {
    return this.httpServer;
  }
}

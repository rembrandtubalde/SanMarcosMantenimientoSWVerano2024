import { Server } from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3001;

const server = new Server(PORT);

try {
  server.listen();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});
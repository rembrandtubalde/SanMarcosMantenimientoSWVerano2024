import { Server } from './app';

const PORT = process.env.PORT || 3001;

const server = new Server(PORT);

try {
  server.listen();
} catch (e) {
  console.log(e);
  process.exit(1);
}
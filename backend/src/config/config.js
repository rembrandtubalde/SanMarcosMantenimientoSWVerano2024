import dotenv from 'dotenv';

dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = 3001;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI || '';
}

export default { MONGODB_URI, PORT };

import dotenv from 'dotenv';
import * as cloudinary from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: 'ashel-root',
  api_key: '462553489283773',
  api_secret: 'JKoLjkfx8O9eLrqwIWj8rJssBk0',
});

export default cloudinary.v2;

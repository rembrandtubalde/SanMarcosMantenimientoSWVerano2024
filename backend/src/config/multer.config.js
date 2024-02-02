/* eslint-disable object-shorthand */
import multer from 'multer';
import * as cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  params: {
    folder: 'my-dates',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
  cloudinary: cloudinary,
});

export default multer({ storage });

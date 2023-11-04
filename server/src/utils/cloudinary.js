import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const { CLOUD_NAME, CLOUD_APY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_APY,
  api_secret: CLOUD_SECRET,
  secure: true
});

export default cloudinary;

const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_APY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_APY,
  api_secret: CLOUD_SECRET,
  secure: true
});

module.exports = cloudinary;

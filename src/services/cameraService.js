const { StillCamera } = require('pi-camera-connect');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const { logger } = require('../utils');

const stillCamera = new StillCamera({
  delay: 500,
  width: 800,
  height: 600,
});

const cameraService = {
  takePictureAndUpload: async () => {
    const filePath = `/tmp/pic-${new Date().toISOString()}.jpg`;

    logger.info('Taking picture...');
    const image = await stillCamera.takeImage();

    logger.info('Picture taken! Saving locally...');
    await fs.promises.writeFile(filePath, image);

    logger.info('Uploading to Cloudinary...');
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath);

    logger.info('Picture uploaded!');

    return cloudinaryResponse.secure_url;
  },
};

module.exports = cameraService;

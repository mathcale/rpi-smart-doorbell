const { StillCamera } = require('pi-camera-connect');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const stillCamera = new StillCamera({
  delay: 500,
  width: 800,
  height: 600,
});

const cameraService = {
  takePictureAndUpload: async () => {
    const filePath = `/tmp/pic-${new Date().toISOString()}.jpg`;

    console.info('Taking picture...');
    const image = await stillCamera.takeImage();

    console.info('Picture taken! Saving locally...');
    await fs.promises.writeFile(filePath, image);

    console.info('Uploading to Cloudinary...');
    const cloudinaryResponse = await cloudinary.uploader.upload(filePath);

    console.info('Picture uploaded!');

    return cloudinaryResponse.secure_url;
  },
};

module.exports = cameraService;

require('dotenv').config();
const Gpio = require('onoff').Gpio;

const discordService = require('./services/discordService');
const cameraService = require('./services/cameraService');

const button = new Gpio(17, 'in', 'both');

button.watch(async (err, value) => {
  if (err) {
    console.error('[ERROR] button.watch:', err);
    return;
  }

  if (value === 0) {
    return;
  }

  try {
    const imageUrl = await cameraService.takePictureAndUpload();
    const payload = discordService.buildPayload(imageUrl);

    await discordService.sendMessage(payload);
  } catch (err) {
    console.error(err);
  }
});

process.on('SIGINT', () => {
  button.unexport();
});

console.info('App is running!');

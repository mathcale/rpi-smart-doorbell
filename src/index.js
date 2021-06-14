require('dotenv').config();
const Gpio = require('onoff').Gpio;

const discordService = require('./services/discordService');
const cameraService = require('./services/cameraService');
const { logger } = require('./utils');

const button = new Gpio(17, 'in', 'both');

button.watch(async (err, value) => {
  if (err) {
    logger.error('[ERROR] button.watch:', err);
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
    logger.error(err);
  }
});

process.on('SIGINT', () => {
  button.unexport();
});

logger.info('App is running!');

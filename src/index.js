const Gpio = require('onoff').Gpio;
const button = new Gpio(17, 'in', 'both');

button.watch((err, value) => {
  if (err) {
    console.error('button.watch error', err);
    return;
  }

  console.info(`Button value is ${value}`);
});

process.on('SIGINT', () => {
  button.unexport();
});

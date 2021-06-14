const logger = require('pino')({
  prettyPrint: {
    translateTime: true,
  },
});

module.exports = logger;

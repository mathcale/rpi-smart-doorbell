const fetch = require('node-fetch').default;

const discordService = {
  buildPayload: (imageUrl) => ({
    embeds: [{
      title: '🔔 Ding dong!',
      description: 'Tem alguém na porta!',
      image: {
        url: imageUrl,
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: 'RPi Doorbell',
      },
    }],
  }),
  sendMessage: async (payload) => {
    console.info('Sending message to Discord channel...');

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }

    console.info('Message sent!');
  },
};

module.exports = discordService;

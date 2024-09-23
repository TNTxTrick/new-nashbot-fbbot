const axios = require('axios');

module.exports = {
    name: 'gemini',
    execute: async (telegramBot, msg, args) => {
        const input = args.join(' ');

        if (!input) {
            return telegramBot.sendMessage(msg.chat.id, 'Please enter a prompt. Example usage: /gemini [your prompt]');
        }

        telegramBot.sendMessage(msg.chat.id, 'Processing your request...');

        try {
            const response = await axios.get(`${global.NashBot.END}gemini?prompt=${encodeURIComponent(input)}`);
            const result = response.data.response;

            if (!result) {
                throw new Error('No valid response received from the API.');
            }

            telegramBot.sendMessage(
                msg.chat.id,
                `🤖 Gemini Response\n━━━━━━━━━━━━━━━━━━━\n${result}`
            );
        } catch (error) {
            telegramBot.sendMessage(msg.chat.id, `An error occurred: ${error.message}`);
        }
    },
};

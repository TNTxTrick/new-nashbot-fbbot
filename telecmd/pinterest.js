const axios = require("axios");

module.exports = {
    name: "pinterest",
    description: "Fetches Pinterest images based on a search query.",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const query = msg.text.split(' ').slice(1).join(' ');

        if (!query) {
            return telegramBot.sendMessage(
                chatId,
                "❗ Please provide a search query for Pinterest images.\n\nExample: /pinterest jungkuuk"
            );
        }

        telegramBot.sendMessage(chatId, "mag antay ka gago...");

        try {
            const response = await axios.get(`${global.NashBot.END}api/pinterest?q=${encodeURIComponent(query)}`);
            const images = response.data.result;

            if (images.length === 0) {
                return telegramBot.sendMessage(chatId, "No images found for your query.");
            }

            const media = images.slice(0, 10).map(url => ({ type: 'photo', media: url }));

            await telegramBot.sendMediaGroup(chatId, media);
        } catch (error) {
            console.error(error);
            telegramBot.sendMessage(chatId, "An error occurred while fetching images. Please try again later.");
        }
    },
};

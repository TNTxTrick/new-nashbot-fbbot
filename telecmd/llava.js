const axios = require("axios");

async function llavaAPI(query) {
    try {
        const response = await axios.get(`${global.NashBot.ENDPOINT}llava?q=${encodeURIComponent(query)}`);
        return response.data.response || "Unexpected API response format.";
    } catch (error) {
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "llava",
    description: "Interact with the Llava API",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    aliases: ["llava"],
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const query = msg.text.split(' ').slice(1).join(' ');

        if (!query) {
            return telegramBot.sendMessage(chatId, "Please enter a query.");
        }

        telegramBot.sendMessage(chatId, "Processing your request...").then(async (info) => {
            try {
                const response = await llavaAPI(query);
                telegramBot.editMessageText(
                    `[Llava]\n\n${response}`,
                    { chat_id: chatId, message_id: info.message_id }
                );
            } catch (error) {
                telegramBot.sendMessage(chatId, "Error processing your request: " + error.message);
            }
        }).catch(err => {
            console.error("Error sending message:", err.message);
        });
    },
};

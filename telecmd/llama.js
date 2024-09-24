const axios = require("axios");

async function llamaAPI(query) {
    try {
        const response = await axios.get(`${global.NashBot.ENDPOINT}Llama?q=${encodeURIComponent(query)}`);
        if (response.data && response.data.response) {
            return response.data.response;
        } else {
            return "Unexpected API response format. Please check the API or contact support.";
        }
    } catch (error) {
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "llama",
    description: "tanginamo",
    nashPrefix: true,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    aliases: ["llama"],
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const query = msg.text.split(' ').slice(1).join(' ');

        if (!query) {
            return telegramBot.sendMessage(chatId, "Please enter a query to send.");
        }

        telegramBot.sendMessage(
            "[✦ Llama ✦]\n\nProcessing your request..."
        ).then(async (info) => {
            try {
                const response = await llamaAPI(query);
                telegramBot.editMessageText(
                    `[✦ Llama ✦]\n\n${response}`,
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

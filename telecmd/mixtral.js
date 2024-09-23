const axios = require("axios");

async function mixtralAPI(userId, message) {
    try {
        const response = await axios.get(`https://nash-rest-api-production.up.railway.app/Mixtral?userId=${userId}&message=${encodeURIComponent(message)}`);
        if (response.data && response.data.response) {
            return response.data.response;
        } else {
            return "Unexpected API response format. Please check the API or contact support.";
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "mixtral",
    description: "Interact with Mixtral conversational AI",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    aliases: ["mixtral"],
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const message = msg.text.split(' ').slice(1).join(' ');

        if (message.toLowerCase() === "clear") {
            try {
                const response = await mixtralAPI(userId, "clear");
                return telegramBot.sendMessage(chatId, `[ 𝙼𝚒𝚡𝚝𝚛𝚊𝚕 𝙰𝙸 ]\n\n${response}\n\n[ Reply to this message to start a new conversation ]`);
            } catch (error) {
                return telegramBot.sendMessage(chatId, `Error processing your request: ${error.message}`);
            }
        }

        if (!message) {
            return telegramBot.sendMessage(chatId, "Please enter a message to send.");
        }

        telegramBot.sendMessage(chatId, "[ 𝙼𝚒𝚡𝚝𝚛𝚊𝚕 𝙰𝙸 ]\n\n⏳ Processing your request...\n\n[ Type 'clear' to reset the conversation ]")
            .then(async (info) => {
                try {
                    const response = await mixtralAPI(userId, message);
                    telegramBot.editMessageText(
                        `[ 𝙼𝚒𝚡𝚝𝚛𝚊𝚕 𝙰𝙸 ]\n\n${response}\n\n[ Reply to this message to continue the conversation ]`,
                        { chat_id: chatId, message_id: info.message_id }
                    );
                } catch (error) {
                    telegramBot.sendMessage(chatId, `Error processing your request: ${error.message}`);
                }
            })
            .catch(err => {
                console.error("Error sending message:", err.message);
            });
    },
};

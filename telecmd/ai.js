const axios = require("axios");

async function aic(q, uid) {
    try {
        const response = await axios.get(`${global.NashBot.END}gpt4?prompt=${encodeURIComponent(q)}&uid=${uid}`);
        return response.data.gpt4;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "ai",
    description: "Talk to GPT4 (conversational)",
    nashPrefix: false,
    version: "1.0.2",
    cooldowns: 5,
    aliases: ["ai"],
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const prompt = msg.text.split(' ').slice(1).join(' ');

        if (!prompt) {
            return telegramBot.sendMessage(chatId, "Please enter a prompt.");
        }

        telegramBot.sendMessage(chatId, "[ 𝙲𝙾𝙽𝚅𝙴𝚁𝚂𝙰𝚃𝙸𝙾𝙽𝙰𝙻 𝙰𝙸 ]\n\n⏳ Searching for answer...\n\n[ Type 'clear' to reset the conversation with AI ]")
            .then(async (info) => {
                try {
                    const response = await aic(prompt, userId);
                    telegramBot.editMessageText(
                        "[ 𝙲𝙾𝙽𝚅𝙴𝚁𝚂𝙰𝚃𝙸𝙾𝙽𝙰𝙻 𝙰𝙸 ]\n\n" + response +
                        "\n\n[ REPLY TO THIS MESSAGE TO CONTINUE THE CONVERSATION WITH AI ]",
                        { chat_id: chatId, message_id: info.message_id }
                    );
                } catch (g) {
                    telegramBot.sendMessage(chatId, "Error processing your request: " + g.message);
                }
            })
            .catch(err => {
                console.error("Error sending message:", err.message);
            });
    },
};

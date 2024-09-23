const axios = require('axios');

module.exports = {
    name: "ai2",
    description: "Chat with the AI",
    nashPrefix: false,
    version: "1.0.0",
    cooldowns: 5,
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const userMessage = msg.text.split(' ').slice(1).join(' ');

        if (!userMessage) {
            return telegramBot.sendMessage(
                chatId,
                "[ GPT 4o ]\n\n" +
                "❗ Please provide a message to chat with the AI.\n\nExample: /ai5 Hello!"
            );
        }

        const loadingMessage = await telegramBot.sendMessage(
            chatId,
            "[ GPT 4o ]\n\n" +
            "⏳ Please wait while I process your request..."
        );

        try {
            const response = await axios.post('https://free-ai-models.vercel.app/v1/chat/completions', {
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: 'You are AI(gpt4-o)' },
                    { role: 'user', content: userMessage }
                ]
            });

            const aiResponse = response.data.response;

            telegramBot.editMessageText(
                "[ GPT 4o ]\n\n" + aiResponse,
                { chat_id: chatId, message_id: loadingMessage.message_id }
            );
        } catch (error) {
            telegramBot.editMessageText(
                "[ GPT 4o ]\n\n" +
                "❌ Error: Unable to process your request. Please try again later.",
                { chat_id: chatId, message_id: loadingMessage.message_id }
            );
        }
    },
};

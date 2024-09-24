module.exports = {
    name: 'un',
    description: 'unsend message ni sya bay',
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const messageId = msg.reply_to_message ? msg.reply_to_message.message_id : null;

        if (!messageId) {
            return telegramBot.sendMessage(chatId, "Please reply to a bot's message to unsend it.");
        }

        try {
            await telegramBot.deleteMessage(chatId, messageId);
        } catch (error) {
        }
    },
};

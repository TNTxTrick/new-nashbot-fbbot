const axios = require("axios");

module.exports = {
    name: "register",
    description: "Register a user and initialize their balance",
    execute: async (telegramBot, msg) => {
        const userID = msg.from.id;
        const username = msg.from.first_name;

        try {
            const checkResponse = await axios.get(`${global.NashBot.MONEY}check-user`, {
                params: { userID },
            });

            if (checkResponse.data.exists) {
                return telegramBot.sendMessage(msg.chat.id, `⚠️ You are already registered with a balance of ₱${checkResponse.data.balance}.`);
            }

            const response = await axios.post(`${global.NashBot.MONEY}register`, {
                userID,
                username,
            });

            telegramBot.sendMessage(msg.chat.id, `Welcome, ${username}! You have been registered with an initial balance of ₱${response.data.balance}.`);
        } catch (error) {
            telegramBot.sendMessage(msg.chat.id, "⚠️ An error occurred during registration. Please try again.");
        }
    },
};
const axios = require("axios");

const emojis = ["🍒", "🍉", "🍇", "🍋", "🍊", "🍌", "🍎", "🍓"];

module.exports = {
    name: "scatter",
    role: 'user',
    execute: async (bot, msg, args) => {
        const userID = msg.from.id;
        const amountToBet = parseInt(args[0], 10);

        if (!amountToBet || amountToBet <= 0) {
            return bot.sendMessage(msg.chat.id, "Invalid bet amount. Please enter a positive number to play.");
        }

        try {
            const balanceResponse = await axios.get(`${global.NashBot.MONEY}check-user`, { params: { userID } });
            const userBalance = balanceResponse.data.balance;

            if (!balanceResponse.data.exists) {
                return bot.sendMessage(msg.chat.id, "User not found. Please register first.");
            }

            if (userBalance <= 0) {
                return bot.sendMessage(msg.chat.id, "You have no money left. Please register to get ₱1,000 or earn more to play.");
            }

            if (amountToBet > userBalance) {
                return bot.sendMessage(msg.chat.id, `You only have ₱${userBalance}. Please enter a valid amount to bet.`);
            }

            const win = Math.random() < 0.5;
            const scatterResult = Array.from({ length: 8 }, () => emojis[Math.floor(Math.random() * emojis.length)]);
            const styledResult = `🎰 SCATTER RESULT 🎰\n\n${scatterResult.slice(0, 4).join(" | ")}\n${scatterResult.slice(4).join(" | ")}`;

            if (win) {
                await axios.get(`${global.NashBot.MONEY}save-money`, { params: { userID, amount: amountToBet } });
                bot.sendMessage(
                    msg.chat.id,
                    `Congratulations! You won ₱${amountToBet}!\n\n` +
                    `Balance: ₱${userBalance + amountToBet}\n\n` +
                    `${styledResult}`
                );
            } else {
                await axios.get(`${global.NashBot.MONEY}deduct-money`, { params: { userID, amount: amountToBet } });
                const newBalance = userBalance - amountToBet;

                bot.sendMessage(
                    msg.chat.id,
                    `Oops! You lost ₱${amountToBet}.\n\n` +
                    `Balance: ₱${newBalance <= 0 ? 0 : newBalance}\n\n` +
                    `${styledResult}`
                );
            }
        } catch (error) {
            bot.sendMessage(msg.chat.id, "An error occurred while processing your request. Please try again later.");
        }
    },
};

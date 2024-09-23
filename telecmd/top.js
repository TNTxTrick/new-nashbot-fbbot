const axios = require('axios');

module.exports = {
    name: "top",
    description: "palubot ka",
    nashPrefix: false,
    async execute(telegramBot, msg) {
        try {
            const response = await axios.get(`${global.NashBot.MONEY}leaderboard`);
            const leaderboard = response.data;

            if (leaderboard.length === 0) {
                return telegramBot.sendMessage(msg.chat.id, "No users found in the leaderboard.");
            }

            let leaderboardMessage = "🏆 Leaderboard 🏆\n\n";
            leaderboard.forEach((user, index) => {
                leaderboardMessage += `${index + 1}. ${user.username} - ₱${user.balance}\n`;
            });

            telegramBot.sendMessage(msg.chat.id, leaderboardMessage, { parse_mode: "Markdown" });
        } catch (error) {
            telegramBot.sendMessage(msg.chat.id, "❌ Error fetching leaderboard. Please try again later.");
        }
    },
};

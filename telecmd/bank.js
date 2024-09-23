const axios = require("axios");

module.exports = {
  name: "bank",
  nashPrefix: false,
  execute: async (bot, msg) => {
    const userID = msg.from.id;

    try {
      const response = await axios.get(`${global.NashBot.MONEY}check-user`, {
        params: { userID },
      });

      if (response.data.exists) {
        const balance = response.data.balance || 0;
        bot.sendMessage(
          msg.chat.id,
          `
【 𝗡𝗔𝗦𝗛 】 𝗕𝗮𝗻𝗸 🏦 
──────────────────
💰 𝗬𝗼𝘂𝗿 𝗰𝘂𝗿𝗿𝗲𝗻𝘁 𝗱𝗲𝗽𝗼𝘀𝗶𝘁 𝗯𝗮𝗹𝗮𝗻𝗰𝗲: ₱${balance} 💵

📜 𝗗𝗶𝘀𝗰𝗹𝗮𝗶𝗺𝗲𝗿: 𝗧𝗵𝗶𝘀 𝗰𝘂𝗿𝗿𝗲𝗻𝗰𝘆 𝗶𝘀 𝗽𝘂𝗿𝗲𝗹𝘆 𝗱𝗶𝗴𝗶𝘁𝗮𝗹 𝗮𝗻𝗱 𝗰𝗮𝗻𝗻𝗼𝘁 𝗯𝗲 𝗲𝘅𝗰𝗵𝗮𝗻𝗴𝗲𝗱 𝗳𝗼𝗿 𝗽𝗵𝘆𝘀𝗶𝗰𝗮𝗹 𝗰𝗮𝘀𝗵.
──────────────────
          `
        );
      } else {
        bot.sendMessage(msg.chat.id, "⚠️ User not found. Please register first.");
      }
    } catch (error) {
      bot.sendMessage(msg.chat.id, "⚠️ An error occurred while retrieving your balance. Please try again later.");
    }
  },
};

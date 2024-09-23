const axios = require("axios");

const userCooldowns = {};

module.exports = {
  name: "freemoney",
  nashPrefix: false,
  execute: async (bot, msg) => {
    const userID = msg.from.id;
    const currentTime = new Date().getTime();
    
    if (userCooldowns[userID] && currentTime - userCooldowns[userID] < 60 * 60 * 1000) {
      const timeLeft = Math.ceil((60 * 60 * 1000 - (currentTime - userCooldowns[userID])) / 60000);
      return bot.sendMessage(msg.chat.id, `Please wait ${timeLeft} minutes to claim free money again.`);
    }

    try {
      await axios.get(`${global.NashBot.MONEY}save-money`, { params: { userID, amount: 500 } });
      bot.sendMessage(msg.chat.id, "You've received ₱500 free money! Come back in an hour for more.");
      
      userCooldowns[userID] = currentTime;
    } catch (error) {
      bot.sendMessage(msg.chat.id, "An error occurred. Please try again later.");
    }
  },
};

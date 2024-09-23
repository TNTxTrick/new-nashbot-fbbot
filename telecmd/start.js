const welcomeImage = 'https://i.imgur.com/2Co5ddF.jpeg';

module.exports = {
    name: 'start',
    execute: (telegramBot, msg) => {
        const welcomeMessage = `
Welcome to NashBot

Hello, ${msg.from.first_name}! We're excited to have you here.

This bot can assist you with a variety of tasks using AI and more.

How to use the bot:
- To interact with the AI, type /ai followed by your prompt.
- For help on other commands, type /help.

Enjoy mother fucker!
`;

        telegramBot.sendPhoto(msg.chat.id, welcomeImage, { caption: welcomeMessage, parse_mode: 'Markdown' });
    },
};
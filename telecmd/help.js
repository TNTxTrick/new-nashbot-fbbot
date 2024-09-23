const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    execute: (telegramBot, msg) => {
        const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith('.js'));
        const commandList = commandFiles.map(file => {
            const command = require(`./${file}`);
            return `❖ /${command.name}`;
        });

        const helpMessage = `
╔══════════════════╗
              𝗡𝗮𝘀𝗵𝗕𝗼𝘁 𝗛𝗲𝗹𝗽 ✨
╚══════════════════╝
${commandList.join('\n')}
╚══════════════════╝
💬 Type a command to get started!
        `;

        telegramBot.sendMessage(msg.chat.id, helpMessage);
    },
};

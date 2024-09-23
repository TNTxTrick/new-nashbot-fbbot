const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const Table = require('cli-table3');
const config = require('./config.json');

global.NashBot = {
    ENDPOINT: "https://ggwp-ifzt.onrender.com/",
    END: "https://deku-rest-api.gleeze.com/",
    MONEY: "https://frizzyelectricclients-production.up.railway.app/"
};

const teleCommands = new Map();
const teleCommandFiles = fs.readdirSync(path.join(__dirname, 'telecmd')).filter(file => file.endsWith('.js'));

teleCommandFiles.forEach(file => {
    const command = require(`./telecmd/${file}`);
    teleCommands.set(command.name, command);
});

const telegramBot = new TelegramBot(config.telegramToken, { polling: true });

telegramBot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text.trim().split(' ');
    const commandName = text[0].replace('/', '').toLowerCase();
    const args = text.slice(1);

    const command = teleCommands.get(commandName);

    if (command) {
        command.execute(telegramBot, msg, args);
    } else {
        telegramBot.sendMessage(chatId, `Unknown command. Type '/help' for a list of commands.`);
    }
});

const table = new Table({
    head: ['Loaded Commands'],
    colWidths: [30],
    style: {
        head: ['magenta'],
        border: ['cyan'],
        'padding-left': 1,
        'padding-right': 1
    }
});

const loadedCommands = teleCommandFiles.map(file => file.replace('.js', ''));
loadedCommands.forEach(cmd => table.push([cmd]));

function rainbow(text) {
    const colors = [
        '\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m'
    ];
    let result = '';
    let colorIndex = 0;
    for (let i = 0; i < text.length; i++) {
        result += colors[colorIndex] + text[i];
        colorIndex = (colorIndex + 1) % colors.length;
    }
    return result + '\x1b[0m';
}

console.log(rainbow(`
███╗░░██╗░█████╗░░██████╗██╗░░██╗
████╗░██║██╔══██╗██╔════╝██║░░██║
██╔██╗██║███████║╚█████╗░███████║
██║╚████║██╔══██║░╚═══██╗██╔══██║
██║░╚███║██║░░██║██████╔╝██║░░██║
╚═╝░░╚══╝╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝
`));

console.log(rainbow("✨ Welcome to NashBot! ✨"));
console.log(rainbow("Get ready to explore awesome commands!"));
console.log(table.toString());

console.log(rainbow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
console.log(rainbow("   Use '/help' for available commands  "));
console.log(rainbow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
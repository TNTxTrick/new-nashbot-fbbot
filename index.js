const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const Table = require('cli-table3');
const config = require('./config.json');

const app = express();
const telegramBot = new TelegramBot(config.telegramToken, { polling: true });

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


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

telegramBot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const [commandName, ...args] = msg.text.trim().split(' ').map(text => text.replace('/', '').toLowerCase());
    const command = teleCommands.get(commandName);

    if (command) {
        command.execute(telegramBot, msg, args);
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
    const colors = ['\x1b[31m', '\x1b[33m', '\x1b[32m', '\x1b[36m', '\x1b[34m', '\x1b[35m'];
    return text.split('').map((char, index) => `${colors[index % colors.length]}${char}`).join('') + '\x1b[0m';
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

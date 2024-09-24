const { TempMail } = require("1secmail-api");

function generateRandomId() {
    const length = 6;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomId;
}

module.exports = {
    name: "tempm",
    description: "Generate a temporary email (auto get inbox)",
    aliases: ["temp"],
    cooldown: 5,
    nashPrefix: false,
    execute: async (telegramBot, msg) => {
        const chatId = msg.chat.id;
        const reply = (message) => telegramBot.sendMessage(chatId, message);

        try {
            const mail = new TempMail(generateRandomId());
            mail.autoFetch();

            if (mail) reply(`📬 Your temporary email: ${mail.address}`);

            const fetch = async () => {
                const mails = await mail.getMail();
                if (!mails[0]) return;

                const b = mails[0];
                const message = `✨ You have a new message! ✨\n\nFrom:* ${b.from}\nSubject:* ${b.subject}\nMessage: ${b.textBody}\nDate: ${b.date}\n\nNote: Messages are automatically deleted after being fetched.`;
                reply(message);
                await mail.deleteMail();
            };
            
            fetch();
            setInterval(fetch, 3000);

        } catch (err) {
            console.error(err);
            return reply("❌ An error occurred: " + err.message);
        }
    },
};

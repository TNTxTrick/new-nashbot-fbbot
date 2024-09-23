# How to get token for telebot?
go to @botfather then start after you start put this /newbot after thank make a name for example nasbot after you submit put this again nashbot_bot then after that get the token and put to the config.json

# NashBot Command Guide
Developed by Joshua Apostol
## Getting Started
Welcome to NashBot! This guide will walk you through how to create commands for NashBot, setting up the bot, and configuring it for your needs. Follow through the steps below to get started.
## Creating a Command
To create a brand new command for NashBot, you will have to go through the following steps:
### 1. Create a New Command File
1. **Create a New File**:- Go into the `commands` Directory of your Project. - Make a new file and name it something like `hello.js`.
2. **Command Code**: - Open `hello.js` in Notepad (or any other text editor) and paste the following code:
```javascript
const fs = require('fs');
const path = require('path');

// Export the command module
module.exports = {
    name: 'hello', // The command name that users will type
    description: 'Sends a friendly greeting message', // What the command does
    cooldown: 5, // How many seconds users have to wait before using this command again
    role: 'user', // The role required to use this command ('admin' or 'user')
    nashPrefix: false, // Whether the command requires a prefix (false means no prefix needed)
    execute: async (api, event, args) => {
        // This function is called when the command is executed

        // Combine all arguments into a single string
        const userMessage = args.join(' ');

        // Check if any additional message was provided
        if (!userMessage) {
            // If no message was provided, send a default response
            return api.sendMessage(
                'Hello! How can I assist you today?', // The message sent back
                event.threadID, // The ID of the thread where the message should be sent
                event.messageID // The ID of the original message to reference
            );
        }

        // If a message was provided, send it back to the user
        api.sendMessage(
            `Hello! You said: "${userMessage}"`, // The message sent back
            event.threadID, // The ID of the thread where the message should be sent
            event.messageID // The ID of the original message to reference
        );
    },
};
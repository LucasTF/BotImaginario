const Discord = require('discord.js');

const bot  = require('./src/json/token.json');
const userHandler = require('./src/userHandler.js');

const CMD_PREFIX = '!';

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot is running...');
});

client.on('message', async msg =>{
    if(!msg.author.bot){
        const author = msg.author;
        const isUserBlackListed = userHandler(author.username, author.discriminator);
        if(isUserBlackListed){
            if(msg.content.startsWith(CMD_PREFIX)) msg.reply(' negativo.');
            else msg.channel.send(`Calado, ${author}`);
        }
        else{
            let args = msg.content.substring(CMD_PREFIX.length).split(" ");
            if(args !== undefined){
                const executeCmd = require('./src/commandHandler.js');
                executeCmd(msg, args);
            }
        }
    }
});

client.login(bot.token);
const Discord = require('discord.js');
const fs = require('fs');

const {isInBlackList} = require('./src/blackListHandler.js');
const {token} = require('./src/json/token.json');
const config = require('./src/json/config.json');

const client = new Discord.Client();
const talkedRecently = new Set();

const roles = ["ADM", "Moderadores", "Desenvolvedor"];
let canTalk = true;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for(let file of commandFiles){
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot is running...');
});

client.on('message', msg =>{
    if(!msg.author.bot){
        const author = msg.author;
        if(isInBlackList(author.username, author.discriminator)){
            if(msg.content.startsWith(config.cmd_prefix)) msg.reply(' negativo.');
            else if(!config.silent_mode) msg.channel.send(`Calado, ${author}`);
        }
        else{
            if(msg.content.startsWith(config.cmd_prefix)){
                if(!talkedRecently.has(author.id) && canTalk){
                    let args = msg.content.substring(config.cmd_prefix.length).split(" ");
                    if(args !== undefined){
                        const executeCmd = require('./src/commandHandler.js');
                        executeCmd(client, msg, args);
                        if(!config.cooldown.global){
                            if(!msg.member.roles.find(r => roles.indexOf(r.name) !== -1)){
                                talkedRecently.add(author.id);
                                setTimeout(() => {
                                    talkedRecently.delete(author.id);
                                }, config.cooldown.time*1000);
                            }
                        }
                        else{
                            canTalk = false;
                            setTimeout(() => {
                                canTalk = true;
                            }, config.cooldown.time*1000);
                        } 
                    }
                }
                else{
                    author.send(`Espere ${config.cooldown.time} segundos antes de utilizar o bot novamente.`);
                }
            }
        }
    }
});

client.login(token);
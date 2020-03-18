const Discord = require('discord.js');
const fs = require('fs');
const { findServer } = require('./src/handlers/serverHandler.js');

const {
    validateBlackList,
    validateCommand,
    validateCooldown,
    validateServerRegistration,
} = require('./src/validators');

const { dev_token } = require('./src/json/token.json');
const token = process.env.BOT_TOKEN || dev_token;

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync('./src/commands/')
    .filter(file => file.endsWith('.js'));
for (let file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot is running...');
});

client.on('userUpdate', () => {
    console.log('User updated.');
});

client.on('message', msg => {
    if (!msg.author.bot) {
        if (validateServerRegistration(msg)) {
            const server = findServer(msg.guild.id);
            if (
                validateCommand(msg, server) &&
                validateBlackList(msg) &&
                validateCooldown(msg, server)
            ) {
                const args = msg.content
                    .substring(server.config.cmd_prefix.length)
                    .split(' ');
                if (args) {
                    const executeCmd = require('./src/handlers/commandHandler.js');
                    executeCmd(client, msg, args);
                    let isImmune = true;
                    if (server.config.cooldown.immune_roles.length !== 0) {
                        const foundRole = server.config.cooldown.immune_roles.find(
                            role => {
                                return msg.member.roles.has(role);
                            }
                        );
                        if (!foundRole) isImmune = false;
                    }
                    if (server.config.cooldown.global && !isImmune) {
                        server.config.cooldown.can_talk = false;
                        setTimeout(() => {
                            server.config.cooldown.can_talk = true;
                            console.log('[Global Timeout] executed');
                        }, server.config.cooldown.time * 1000);
                    } else {
                        if (!isImmune) {
                            server.config.cooldown.cooling.push(msg.author.id);
                            console.log(
                                '[Cooling Updated] ',
                                server.config.cooldown.cooling
                            );
                            setTimeout(() => {
                                const index = server.config.cooldown.cooling.indexOf(
                                    msg.author.id
                                );
                                const spliced = server.config.cooldown.cooling.splice(
                                    index
                                );
                                console.log(
                                    `[User Timeout | ${spliced}] executed`
                                );
                            }, server.config.cooldown.time * 1000);
                        }
                    }
                }
            }
        }
    }
});

client.login(token);

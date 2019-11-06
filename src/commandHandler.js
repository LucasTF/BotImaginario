const Discord = require('discord.js');
const fs = require('fs');

const bot  = require('./json/bot_info.json');

const command = (msg, args) => {
    switch(args[0]){
        case 'ajuda':
            const commandaListEmbed = new Discord.RichEmbed()
            .setTitle("Lista de comandos")
            .setDescription("!ajuda\n!test\n!listanegra\n!about\n!block\n!regin\n!joel\n!guilhermes\n!hmmkkbjs\n!random\n!thanos");
            msg.channel.send(commandaListEmbed);
            break;
        case 'test':
            if(args.length >= 2) msg.channel.send(`${msg.author} disse: **${args[1]}**`);
            else msg.channel.send("Hello World!");
            break;
        case 'listanegra':
            const blackListEmbed = new Discord.RichEmbed().setTitle("Status");
            let user = msg.mentions.users.first();
            if(!user) user = msg.author;
            blackListEmbed.setThumbnail(user.avatarURL);
            const userHandler = require('./userHandler.js');
            const isUserBlackListed = userHandler(user.username, user.discriminator);
            if(!isUserBlackListed){
                blackListEmbed.setDescription(`${user.username} não está na lista negra.`);
                blackListEmbed.setColor('#27ae60');
            } 
            else{
                blackListEmbed.setDescription(`${user.username} está na lista negra.`);
                blackListEmbed.setColor('#c0392b');
            }
            msg.author.send(blackListEmbed);
            break;
        case 'about':
            const botEmbed = new Discord.RichEmbed()
            .setTitle("Sobre o bot")
            .addField("Nome", bot.name, true)
            .addField("Versão", bot.version, true)
            .addField("Autor", bot.author, true)
            .setColor('#f1c40f');
            msg.channel.send(botEmbed);
            break;
        case 'block':
            msg.channel.send({files: ["./src/img/block.png"]});
            break;
        case 'thanos':
            msg.channel.send({files: ["./src/img/thanos.gif"]});
            break;
        case 'regin':
        case 'joel':
        case 'guilhermes':
        case 'hmmkkbjs':
        case 'random':
            const dir = `./src/img/prints/${args[0]}`;
            fs.readdir(dir, (err, files) => {
                if(!err){
                    const rand = Math.floor(Math.random() * files.length) + 1;
                    if(rand < 10) msg.channel.send({files: [`${dir}/0${rand}.png`]});
                    else msg.channel.send({files: [`${dir}/${rand}.png`]});
                }
                else{
                    console.log(err);
                }
            });
            break;
        case 'debug':
            // For debug purposes
            break;
    }
}

module.exports = command;
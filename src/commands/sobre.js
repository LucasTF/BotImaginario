const { RichEmbed } = require('discord.js');
const bot = require('../json/bot_info.json');

module.exports = {
    name: 'sobre',
    description: 'Mostra informações sobre o bot',
    execute({ client, msg }) {
        const botEmbed = new RichEmbed()
            .setTitle('Sobre o bot')
            .setThumbnail(client.user.avatarURL)
            .addField('Nome', bot.name, true)
            .addField('Versão', bot.version, true)
            .addField('Autor', bot.author, true)
            .setColor('#f1c40f');
        msg.channel.send(botEmbed);
    },
};

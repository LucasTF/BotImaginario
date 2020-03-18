const { RichEmbed } = require('discord.js');
const blackList = require('../handlers/blackListHandler.js');

const Roles = require('../utils/roles');

module.exports = {
    name: 'listanegra',
    description: 'Mostra se um usuário está na lista negra',
    roles: [Roles.ADMINISTRATOR, Roles.MODERATOR, Roles.DEVELOPER],
    execute(msg, args) {
        const user = msg.mentions.users.first();
        if (args[1] === 'add') {
            let member = msg.mentions.members.first();
            if (user) {
                if (!member.roles.find(r => this.roles.indexOf(r.name) !== -1))
                    blackList.add(msg.guild.id, user.id);
                else
                    msg.reply(
                        'Você não pode colocar um Administrador/Moderador na lista negra.'
                    );
            }
        } else if (args[1] === 'remove') {
            if (user) blackList.remove(msg.guild.id, user.id);
        } else {
            if (user) {
                const blackListEmbed = new RichEmbed().setTitle('Status');
                blackListEmbed.setThumbnail(user.avatarURL);
                const isUserBlackListed = blackList.isInBlackList(
                    msg.guild.id,
                    user.id
                );
                if (!isUserBlackListed) {
                    blackListEmbed.setDescription(
                        `${user.username} não está na lista negra.`
                    );
                    blackListEmbed.setColor('#27ae60');
                } else {
                    blackListEmbed.setDescription(
                        `${user.username} está na lista negra.`
                    );
                    blackListEmbed.setColor('#c0392b');
                }
                msg.author.send(blackListEmbed);
            }
        }
    },
};

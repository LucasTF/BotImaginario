const {RichEmbed} = require('discord.js');
const blackList = require('../blackListHandler.js');

module.exports = {
    name: 'listanegra',
    description: 'Mostra se um usuário está na lista negra',
    roles: ['ADM', 'Moderadores', 'Desenvolvedor'],
    execute(msg, args){
        if(!msg.member.roles.find(r => this.roles.indexOf(r.name) !== -1)){
            return msg.reply("Você não tem permissão para usar esse comando.").then(m => m.delete(2000));
        }
        else{
            if(args[1] === 'add'){
                let user = msg.mentions.users.first();
                let member = msg.mentions.members.first();
                if(user){
                    if(!member.roles.find(r => this.roles.indexOf(r.name) !== -1)) blackList.add(msg, user);
                    else if(user.username === 'ProLukka') msg.reply("kkk, não.");
                    else msg.reply("Você não pode colocar um Moderador/ADM na lista negra.");
                }
            }
            else if(args[1] === 'remove'){
                let user = msg.mentions.users.first();
                if(user) blackList.remove(msg, user);
            }
            else{
                let user = msg.mentions.users.first();
                if(user){
                    const blackListEmbed = new RichEmbed().setTitle("Status");
                    blackListEmbed.setThumbnail(user.avatarURL);
                    const isUserBlackListed = blackList.isInBlackList(user);
                    if(!isUserBlackListed){
                        blackListEmbed.setDescription(`${user.username} não está na lista negra.`);
                        blackListEmbed.setColor('#27ae60');
                    } 
                    else{
                        blackListEmbed.setDescription(`${user.username} está na lista negra.`);
                        blackListEmbed.setColor('#c0392b');
                    }
                    msg.author.send(blackListEmbed);
                }
            }
        }
    }
}
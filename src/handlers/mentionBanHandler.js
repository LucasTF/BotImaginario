const Mentions = require('../json/mentions.json');

const handleMentions = (msg, user) => {
    const member = msg.guild.member(user);
    const memberLog = Mentions.find((ment, i, Mentions) => {
        if(ment.userId == member.id){
            if(Mentions[i].mentions < 4){
                Mentions[i].mentions = Mentions[i].mentions + 1;
                msg.channel.send(`${user} foi marcado ${Mentions[i].mentions} vez(es)`);
                return true;
            }
            Mentions[i].mentions = 0;
            member.kick('Acha que eu não consigo?').then(() => {
                msg.channel.send(`${user} faleceu.`);
                console.log('Funciona');
            }).catch(err => {
                console.log(err);
            });
        }
    });
}

exports.handleMentions = handleMentions;
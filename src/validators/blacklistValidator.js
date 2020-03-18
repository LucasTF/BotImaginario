const { isInBlackList } = require('../handlers/blackListHandler');

const validateBlackList = msg => {
    if (isInBlackList(msg.guild.id, msg.author.id)) {
        msg.author
            .send(
                'Você está na lista negra, portanto não poderá usar comandos do bot.'
            )
            .then(res => {
                console.log(
                    `[Blacklist] Message sent to: [${msg.author.id}] ${msg.author.name}`
                );
            })
            .catch(err => {
                console.log(`[Blacklist] Couldn't send message.`, err);
            });
        return false;
    }
    return true;
};

exports.validateBlackList = validateBlackList;

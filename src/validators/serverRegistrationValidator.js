const {
    registerServer,
    isServerRegistered,
} = require('../handlers/serverRegisterHandler');

const validateServerRegistration = msg => {
    if (msg.content.startsWith('b!register')) {
        const args = msg.content.substring(2).split(' ');
        if (args[1]) {
            registerServer(msg.guild.id, msg.guild.name, args[1], response => {
                msg.channel.send(response);
            });
        } else {
            msg.channel.send(
                'É necessário informar um id de canal para configuração do bot.'
            );
        }
        return false;
    } else {
        if (!isServerRegistered(msg.guild.id)) {
            return false;
        }
        return true;
    }
};

exports.validateServerRegistration = validateServerRegistration;

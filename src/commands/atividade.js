const Roles = require('../utils/roles');

module.exports = {
    name: 'atividade',
    description: 'Altera o que o bot está jogando',
    roles: [
        Roles.ADMINISTRATOR,
        Roles.DEVELOPER,
        Roles.MODERATOR,
        Roles.SERVER_BOOSTER,
    ],
    execute(client, msg, args) {
        msg.delete(100).catch(console.error);
        if (args[1] && args[2]) {
            let text = args.slice(2);
            text = text.join(' ');
            switch (args[1]) {
                case 'jogando':
                    client.user.setActivity(text, { type: 'PLAYING' });
                    break;
                // case 'streaming':
                //     client.user.setActivity(text, {type: "STREAMING"});
                //     break;
                case 'ouvindo':
                    client.user.setActivity(text, { type: 'LISTENING' });
                    break;
                case 'assistindo':
                    client.user.setActivity(text, { type: 'WATCHING' });
                    break;
            }
        } else {
            client.user.setActivity();
        }
    },
};

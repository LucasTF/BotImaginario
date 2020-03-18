const Roles = require('../utils/roles');

module.exports = {
    name: 'localimage',
    description: 'Posta uma imagem guardada localmente',
    roles: [
        Roles.ADMINISTRATOR,
        Roles.MODERATOR,
        Roles.DEVELOPER,
        Roles.SERVER_BOOSTER,
    ],
    execute(msg, image) {
        msg.channel.send({ files: [image] });
    },
};

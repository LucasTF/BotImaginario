const Roles = require('../utils/roles');

const images = require('../json/imageDictionary.json');

module.exports = {
    name: 'localimage',
    description: 'Posta uma imagem guardada localmente',
    roles: [
        Roles.ADMINISTRATOR,
        Roles.MODERATOR,
        Roles.DEVELOPER,
        Roles.SERVER_BOOSTER,
    ],
    execute({ msg, args }) {
        const dir = './src/img';
        msg.channel.send({ files: [`${dir}/${images[args[0]]}`] });
    },
};

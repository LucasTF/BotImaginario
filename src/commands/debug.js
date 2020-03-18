const config = require('../json/config.json');

module.exports = {
    name: 'debug',
    description: 'debug command for testing purposes',
    execute(msg) {
        console.log(msg.channel.id);
    },
};

const config = require('../json/config.json');

module.exports = {
    name: 'debug',
    description: 'debug command for testing purposes',
    execute(msg, args){
        for(let i = 0; i < 5; i++){
            msg.channel.send(i);
        }
    }
}
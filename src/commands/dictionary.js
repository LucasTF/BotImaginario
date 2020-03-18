const fs = require('fs');
const path = require('path');

const dictionary = require('../json/dictionary.json');
const Roles = require('../utils/roles');

module.exports = {
    name: 'dictionary',
    description: 'Manage the dictionary.',
    roles: [Roles.ADMINISTRATOR, Roles.DEVELOPER],
    execute(msg, args) {
        msg.delete().catch(console.error);
        if (args[1] && args[2]) {
            dictionary.push({ portuguese: args[1], guilhermese: args[2] });
            const data = JSON.stringify(dictionary);
            fs.writeFile(
                path.join(__dirname, '../json/dictionary.json'),
                data,
                err => {
                    if (err) console.error(err);
                    else console.log('[Dictionary] Dicionario atualizado!');
                }
            );
        }
    },
};

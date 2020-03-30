const fs = require('fs');
const Roles = require('../utils/roles');

module.exports = {
    name: 'gifs',
    description: 'Posta os gifs guardados localmente',
    roles: [
        Roles.ADMINISTRATOR,
        Roles.MODERATOR,
        Roles.MODERATOR,
        Roles.SERVER_BOOSTER,
    ],
    execute({ msg, args }) {
        const dir = `./src/img/prints/${args[0]}`;
        fs.readdir(dir, (err, files) => {
            if (!err) {
                let imageNum;
                if (
                    args[1] &&
                    !isNaN(args[1]) &&
                    isFinite(args[1]) &&
                    args[1] % 1 === 0 &&
                    args[1] > 0
                )
                    imageNum = parseInt(args[1]);
                else imageNum = Math.floor(Math.random() * files.length) + 1;
                if (imageNum < 10) {
                    msg.channel
                        .send({ files: [`${dir}/0${imageNum}.gif`] })
                        .then(
                            res => {},
                            err => {
                                if (err) console.log(err);
                            }
                        );
                } else {
                    msg.channel
                        .send({ files: [`${dir}/${imageNum}.gif`] })
                        .then(
                            res => {},
                            err => {
                                if (err) console.log(err);
                            }
                        );
                }
            } else {
                console.log(err);
            }
        });
    },
};

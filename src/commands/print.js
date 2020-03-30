const fs = require('fs');

module.exports = {
    name: 'print',
    description: 'Posta os prints guardados localmente',
    execute({ msg, args }) {
        const dir = `./src/img/prints/${args[0]}`;
        const extension = args[0] === 'alves' ? 'jpg' : 'png';
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
                        .send({ files: [`${dir}/0${imageNum}.${extension}`] })
                        .then(
                            res => {},
                            err => {
                                if (err) console.log(err);
                            }
                        );
                } else {
                    msg.channel
                        .send({ files: [`${dir}/${imageNum}.${extension}`] })
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

const { updateServerCooldown } = require('../handlers/serverHandler');

const Roles = require('../utils/roles');

module.exports = {
    name: 'cooldown',
    description: 'Altera o tempo de cooldown e se ele é global ou por usuário.',
    roles: [Roles.ADMINISTRATOR, Roles.DEVELOPER],
    execute(msg, args) {
        if (
            args[1] &&
            !isNaN(args[1]) &&
                isFinite(args[1]) &&
                args[1] % 1 === 0 &&
                args[1] >= 0 &&
                args[1] <= 300
        ) {
            if (args[2]) {
                let global;
                args[2] === 'true' ? (global = true) : (global = false);
                updateServerCooldown(msg.guild.id, parseInt(args[1]), global);
            }
        } else {
            msg.author.send(
                'O tempo de espera do bot deve ser um valor entre 0 e 300 segundos (5 minutos).'
            );
        }
    },
};

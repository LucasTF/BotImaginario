const validateCooldown = (msg, server) => {
    let isImmune = true;
    if (server.config.cooldown.immune_roles.length !== 0) {
        const foundRole = server.config.cooldown.immune_roles.find(role => {
            return msg.member.roles.has(role);
        });
        if (!foundRole) isImmune = false;
    }
    if (server.config.cooldown.global) {
        if (isImmune) {
            return true;
        }
        return server.config.cooldown.can_talk;
    } else {
        if (isImmune) {
            return true;
        }
        if (server.config.cooldown.cooling.includes(msg.author.id)) {
            msg.author.send(
                `Espere ${server.config.cooldown.time} segundos para utilizar o bot novamente.`
            );
            return false;
        }
        return true;
    }
};

exports.validateCooldown = validateCooldown;

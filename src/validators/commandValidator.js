const validateCommand = (msg, server) => {
    const isInValidChannel = server.config.enabled_channels.includes(
        msg.channel.id
    );
    if (msg.content.startsWith(server.config.cmd_prefix) && isInValidChannel) {
        return true;
    }
    return false;
};

exports.validateCommand = validateCommand;

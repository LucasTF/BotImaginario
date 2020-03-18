const fs = require('fs');
const path = require('path');

const { registerChannel } = require('./serverHandler');

const servers = require('../json/servers.json');

const isServerRegistered = serverId => {
    return servers.includes(
        servers.find(server => {
            return server.server_id === serverId;
        })
    );
};

const registerServer = (
    serverId,
    serverName,
    configChannelId,
    responseFunc
) => {
    if (!isServerRegistered(serverId)) {
        const serverModel = {
            server_id: serverId,
            server_name: serverName,
            config: {
                channel: configChannelId,
                enabled_channels: [configChannelId],
                cmd_prefix: '!',
                silent_mode: true,
                cooldown: {
                    time: 20,
                    global: false,
                    immune_roles: [],
                    cooling: [],
                    can_talk: true,
                },
                mute: {
                    mute_role: '',
                    time: 360,
                },
            },
            blacklist: [],
        };
        servers.push(serverModel);
        const data = JSON.stringify(servers);
        fs.writeFile(
            path.join(__dirname, '../json/servers.json'),
            data,
            err => {
                if (err) {
                    console.log(err);
                } else {
                    responseFunc(
                        'Servidor registrado com sucesso! Aproveite o bot!'
                    );
                    console.log(`[${serverName}] registered.`);
                }
            }
        );
        return false;
    } else {
        registerChannel(serverId, configChannelId);
        responseFunc('Canal registrado!');
        return true;
    }
};

exports.isServerRegistered = isServerRegistered;
exports.registerServer = registerServer;

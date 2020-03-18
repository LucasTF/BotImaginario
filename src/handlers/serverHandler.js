const fs = require('fs');
const path = require('path');

const servers = require('../json/servers.json');

const findServer = serverId => {
    const foundServer = servers.find(server => {
        return server.server_id == serverId;
    });
    return foundServer;
};

const updateServerCooldown = (serverId, cooldownTime, globalCooldown) => {
    const server = findServer(serverId);
    if (server) {
        server.config.cooldown.time = cooldownTime;
        server.config.cooldown.global = globalCooldown;
    }
};

const registerChannel = (serverId, channelId) => {
    const server = findServer(serverId);
    if (server) {
        if (!server.config.enabled_channels.includes(channelId)) {
            server.config.enabled_channels.push(channelId);
            const data = JSON.stringify(servers);
            fs.writeFile(
                path.join(__dirname, '../json/servers.json'),
                data,
                err => {
                    if (err) console.error(err);
                    else console.log('[ServerHandler] Canal registrado!');
                }
            );
        }
    }
};

exports.findServer = findServer;
exports.updateServerCooldown = updateServerCooldown;
exports.registerChannel = registerChannel;

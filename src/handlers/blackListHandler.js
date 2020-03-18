const servers = require('../json/servers.json');
const fs = require('fs');
const path = require('path');

const isInBlackList = (serverId, userId) => {
    return servers.includes(
        servers.find(server => {
            return (
                server.server_id == serverId &&
                server.blacklist.includes(userId)
            );
        })
    );
};

const addToBlackList = (serverId, userId) => {
    if (!isInBlackList(serverId, userId)) {
        const foundServer = servers.findIndex(server => {
            return server.server_id == serverId;
        });
        servers[foundServer].blacklist.push(userId);
        const data = JSON.stringify(servers);
        fs.writeFile(
            path.join(__dirname, '../json/servers.json'),
            data,
            err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`[${userId}] Added to blacklist.`);
                }
            }
        );
    }
};

const removeFromBlackList = (serverId, userId) => {
    if (isInBlackList(serverId, userId)) {
        const serverIndex = servers.findIndex(server => {
            return server.server_id == serverId;
        });
        const userIndex = servers[serverIndex].blacklist.findIndex(
            blacklisted => {
                return blacklisted == userId;
            }
        );
        servers[serverIndex].blacklist.splice(userIndex, userIndex + 1);
        const data = JSON.stringify(servers);
        fs.writeFile(
            path.join(__dirname, '../json/servers.json'),
            data,
            err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`[${userId}] Removed from the blacklist.`);
                }
            }
        );
    }
};

exports.isInBlackList = isInBlackList;
exports.add = addToBlackList;
exports.remove = removeFromBlackList;

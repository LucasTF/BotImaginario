const blackList = require('./json/black_list.json');
const fs = require('fs');

const isInBlackList = (author) => {
    for(let element of blackList){
        if(element.username == author.username){
            if(element.discriminator == author.discriminator){
                return true;
            }
        }
    }
    return false;
}

const addToBlackList = (msg, author) => {
    if(!isInBlackList(author)){
        blackList.push({"username":author.username,"discriminator":author.discriminator});
        const data = JSON.stringify(blackList);
        fs.writeFileSync(__dirname + '/json/black_list.json', data);
        msg.channel.send(`${author} agora está na lista negra.`);
    }
}

const removeFromBlackList = (msg, author) => {
    if(isInBlackList(author)){
        const userIndex = blackList.findIndex((blackListed) => {
            return (blackListed.username == author.username && blackListed.discriminator == author.discriminator);
        });
        if(userIndex != -1){
            blackList.splice(userIndex, 1);
            const data = JSON.stringify(blackList);
            fs.writeFileSync(__dirname + '/json/black_list.json', data);
            msg.channel.send(`${author} não está mais na lista negra.`);
        }
    }
}

exports.isInBlackList = isInBlackList;
exports.add = addToBlackList;
exports.remove = removeFromBlackList;
const isInBlackList = (username, discriminator) => {
    const blackList = require('./json/black_list.json');
    for(let element of blackList){
        if(element.username == username){
            if(element.discriminator == discriminator){
                return true;
            }
        }
    }
    return false;
}

module.exports = isInBlackList;
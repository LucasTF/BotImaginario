const command = (client, msg, args) => {
    switch(args[0]){
        case 'ajuda':
            client.commands.get('ajuda').execute(msg, args);
            break;
        case 'listanegra':
            client.commands.get('listanegra').execute(msg, args);
            break;
        case 'sobre':
            client.commands.get('sobre').execute(client, msg);
            break;
        case 'block':
            client.commands.get('localimage').execute(msg, "./src/img/block.png");
            break;
        case 'padoru':
            client.commands.get('localimage').execute(msg, "./src/img/padoru.png");
            break;
        case 'thanos':
            client.commands.get('localimage').execute(msg, "./src/img/thanos.gif");
            break;
        case 'shelter':
            client.commands.get('localimage').execute(msg, "./src/img/shelter.png");
            break;
        case 'regin':
        case 'joel':
        case 'guilhermes':
        case 'acre':
        case 'akuma':
        case 'hmmkkbjs':
        case 'random':
            client.commands.get('print').execute(msg, args, 'png');
            break;
        case 'alves':
            client.commands.get('print').execute(msg, args, 'jpg');
            break;
        case 'alvesgif':
            client.commands.get('print').execute(msg, args, 'gif');
            break;
        case 'atividade':
            client.commands.get('atividade').execute(client, msg, args);
            break;
        case 'cooldown':
            client.commands.get('cooldown').execute(msg, args);
            break;
        case 'debug':
            // For debug purposes
            if(msg.author.username === 'ProLukka' && msg.author.discriminator == '1584'){
                client.commands.get('debug').execute(msg, args);
            }
            break;
        default:
            client.commands.get('unknown').execute(msg);
            break;
    }
}

module.exports = command;
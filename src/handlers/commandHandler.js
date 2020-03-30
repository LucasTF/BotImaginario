const executeCommand = ({ client, msg, args }) => {
    const command = selectCommand(client, args);
    if (isRoleValid(msg.member, command)) {
        command.execute({ client, msg, args });
    } else
        msg.author.send('Você não tem permissão para utilizar esse comando.');
};

const selectCommand = (client, args) => {
    switch (args[0]) {
        case 'ajuda':
        case 'listanegra':
        case 'sobre':
        case 'atividade':
        case 'cooldown':
            return client.commands.get(args[0]);
        case 'block':
        case 'colapso':
        case 'padoru':
        case 'thanos':
        case 'shelter':
            return client.commands.get('localimage');
        case 'regin':
        case 'guilhermes':
        case 'acre':
        case 'akuma':
        case 'hmmkkbjs':
        case 'random':
        case 'alves':
            return client.commands.get('print');
        case 'alvesgif':
            return client.commands.get('gifs');
        case 'tradutor':
            return client.commands.get('translator');
        case 'dicionario':
            return client.commands.get('dictionary');
        default:
            return client.commands.get('unknown');
    }
};

const isRoleValid = (member, command) => {
    if (command.roles) {
        const foundRole = member.roles.find(role => {
            return command.roles.includes(role.name);
        });
        if (foundRole) return true;
        return false;
    }
    return true;
};

module.exports = executeCommand;

const command = (client, msg, args) => {
    switch (args[0]) {
        case 'ajuda':
            validateRole(msg, args[0], client, () => {
                client.commands.get('ajuda').execute(msg, args);
            });
            break;
        case 'listanegra':
            validateRole(msg, args[0], client, () => {
                client.commands.get('listanegra').execute(msg, args);
            });
            break;
        case 'sobre':
            validateRole(msg, args[0], client, () => {
                client.commands.get('sobre').execute(client, msg);
            });
            break;
        case 'block':
            validateRole(msg, 'localimage', client, () => {
                client.commands
                    .get('localimage')
                    .execute(msg, './src/img/block.png');
            });
            break;
        case 'colapso':
            validateRole(msg, 'localimage', client, () => {
                client.commands
                    .get('localimage')
                    .execute(msg, './src/img/colapso.png');
            });
            break;
        case 'padoru':
            validateRole(msg, 'localimage', client, () => {
                client.commands
                    .get('localimage')
                    .execute(msg, './src/img/padoru.png');
            });
            break;
        case 'thanos':
            validateRole(msg, 'localimage', client, () => {
                client.commands
                    .get('localimage')
                    .execute(msg, './src/img/thanos.gif');
            });
            break;
        case 'shelter':
            validateRole(msg, 'localimage', client, () => {
                client.commands
                    .get('localimage')
                    .execute(msg, './src/img/shelter.png');
            });
            break;
        case 'regin':
        case 'guilhermes':
        case 'acre':
        case 'akuma':
        case 'hmmkkbjs':
        case 'random':
            validateRole(msg, 'print', client, () => {
                client.commands.get('print').execute(msg, args, 'png');
            });
            break;
        case 'alves':
            validateRole(msg, 'print', client, () => {
                client.commands.get('print').execute(msg, args, 'jpg');
            });
            break;
        case 'alvesgif':
            validateRole(msg, 'gifs', client, () => {
                client.commands.get('gifs').execute(msg, args);
            });
            break;
        case 'atividade':
            validateRole(msg, args[0], client, () => {
                client.commands.get('atividade').execute(client, msg, args);
            });
            break;
        case 'cooldown':
            validateRole(msg, args[0], client, () => {
                client.commands.get('cooldown').execute(msg, args);
            });
            break;
        case 'tradutor':
            client.commands.get('translator').execute(msg);
            break;
        case 'dicionario':
            validateRole(msg, 'dictionary', client, () => {
                client.commands.get('dictionary').execute(msg, args);
            });
            break;
        default:
            client.commands.get('unknown').execute(msg);
            break;
    }
};

const validateRole = (msg, command, client, executionCommand) => {
    const commandRoles = client.commands.get(command).roles;
    if (commandRoles) {
        const foundRole = msg.member.roles.find(role => {
            return commandRoles.includes(role.name);
        });
        if (foundRole) {
            executionCommand();
        } else
            msg.author.send(
                'Você não tem permissão para utilizar esse comando.'
            );
    } else {
        executionCommand();
    }
};

module.exports = command;

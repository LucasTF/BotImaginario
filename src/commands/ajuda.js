const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'ajuda',
    description: 'Mostra todos os comandos disponibilizados pelo bot',
    execute({ msg, args }) {
        if (!args[1]) {
            const commandaListEmbed = new RichEmbed()
                .setTitle('Lista de comandos')
                .addField('Utilitários', '!ajuda\n!sobre\n!tradutor', true)
                .addField(
                    'Prints',
                    '!akuma\n!guilhermes\n!hmmkkbjs\n!random\n!regin',
                    true
                )
                .addField('Outros', '!acre\n!alves', true)
                .addField(
                    'Reis do Camarote',
                    '!alvesgif\n!atividade\n!block\n!colapso\n!padoru\n!shelter\n!thanos',
                    true
                )
                .addField('Moderadores', '!listanegra', true)
                .addField('ADM', '!cooldown\n!dicionario', true)
                .setFooter('!ajuda <nome do comando> para mais informações.');
            msg.channel.send(commandaListEmbed);
        } else {
            const commandEmbed = new RichEmbed();
            switch (args[1]) {
                case 'atividade':
                    commandEmbed
                        .setTitle('!atividade')
                        .setDescription('!atividade <tipo> <mensagem>')
                        .addField('<tipo>', 'jogando | assistindo | ouvindo')
                        .addField('<mensagem>', 'O que o bot está fazendo');
                    msg.author.send(commandEmbed);
                    break;
                case 'listanegra':
                    commandEmbed
                        .setTitle('!listanegra')
                        .setDescription('!listanegra <função> <usuário>')
                        .addField('<função>', 'add | remove (Opcional)')
                        .addField(
                            '<usuário>',
                            'Usuário a ser adicionado ou removido da lista negra ex: @Usuario'
                        );
                    msg.author.send(commandEmbed);
                    break;
                case 'cooldown':
                    commandEmbed
                        .setTitle('!cooldown')
                        .setDescription('!cooldown <tempo> <global>')
                        .addField(
                            '<tempo>',
                            'Tempo, em segundos, de cooldown do bot (valores entre 0-300)'
                        )
                        .addField('<global>', 'true | false (Opcional)');
                    msg.author.send(commandEmbed);
                    break;
            }
        }
    },
};

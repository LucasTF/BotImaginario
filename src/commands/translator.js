const { RichEmbed } = require('discord.js');

const dictionary = require('../json/dictionary.json');

module.exports = {
    name: 'translator',
    description: 'Tradutor Português/Guilhermês',
    execute({ msg }) {
        const portuguese = [];
        const guilhermese = [];
        const dictEmbed = new RichEmbed().setTitle(
            'Tradutor Português/Guilhermês'
        );
        dictionary.forEach(entry => {
            portuguese.push(entry.portuguese);
            guilhermese.push(entry.guilhermese);
        });
        dictEmbed.addField('Português', portuguese.join('\n'), true);
        dictEmbed.addField('Guilhermês', guilhermese.join('\n'), true);
        msg.channel.send(dictEmbed);
    },
};

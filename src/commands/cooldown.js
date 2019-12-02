const config = require('../json/config.json');

module.exports = {
    name: 'cooldown',
    description: 'Altera o tempo de cooldown e se ele é global ou por usuário.',
    roles: ['ADM', 'Desenvolvedor'],
    execute(msg, args){
        if(!msg.member.roles.find(r => this.roles.indexOf(r.name) !== -1)){
            return msg.reply("Você não tem permissão para usar esse comando.").then(m => m.delete(2000));
        }
        if(args[1] && (!isNaN(args[1]) && isFinite(args[1]) && args[1]%1 === 0 && args[1] >= 0 && args[1] <= 300)){
            config.cooldown.time = parseInt(args[1]);
            if(args[2]){
                if(args[2] === 'true' || args[2] === 'false') config.cooldown.global = (args[2] == 'true');
                else msg.author.send("O parâmetro \'global\' deve ser \'true\' ou \'false\'.");
            }
        }
        else{
            msg.author.send("O tempo de espera do bot deve ser um valor entre 0 e 300 segundos (5 minutos).");
        }
    }
}
module.exports = {
    name: 'atividade',
    description: 'Altera o que o bot está jogando',
    roles: ['ADM', 'Moderadores', 'Desenvolvedor'],
    execute(client, msg, args){
        if(!msg.member.roles.find(r => this.roles.indexOf(r.name) !== -1)){
            return msg.reply("Você não tem permissão para usar esse comando.").then(m => m.delete(2000));
        }
        if(args[1] && args[2]){
            let text = args.slice(2);
            text = text.join(' ');
            switch(args[1]){
                case 'jogando':
                    client.user.setActivity(text, {type: "PLAYING"});
                    break;
                // case 'streaming':
                //     client.user.setActivity(text, {type: "STREAMING"});
                //     break;
                case 'ouvindo':
                    client.user.setActivity(text, {type: "LISTENING"});
                    break;
                case 'assistindo':
                    client.user.setActivity(text, {type: "WATCHING"});
                    break;
            }
        }
        else{
            client.user.setActivity();
        }
    }
}
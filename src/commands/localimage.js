module.exports = {
    name: 'localimage',
    description: 'Posta uma imagem guardada localmente',
    execute(msg, image){
        msg.channel.send({files: [image]});
    }
}
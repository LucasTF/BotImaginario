module.exports = {
    name: 'unknown',
    description: 'Comando de escape caso o usuário use um comando não registrado',
    execute(msg){
        msg.reply({files: ['./src/img/oque.png']});
    }
}
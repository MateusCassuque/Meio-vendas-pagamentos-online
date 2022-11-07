const mongoose = require('mongoose');
const banco = 'mvpodb3'
mongoose.connect("mongodb://localhost/"+banco, {

    //useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log(`Conecção com Banco ${banco} efectuada com sucesso!`)
    
}).catch((err) => {
    console.log("Erro ao se conectar no Banco: " + err)
});

mongoose.Promise = global.Promise;
module.exports = mongoose;
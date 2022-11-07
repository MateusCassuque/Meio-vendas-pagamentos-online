const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"))

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-headers', '*, Authorization')
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    next()
    
})

app.options('/*', (_, res) => {
    res.sendStatus(200)
})
require('./app/controllers/auth/index')(app);
require('./app/controllers/address/index')(app);
require('./app/controllers/product/index')(app);
require('./app/controllers/IMG/index')(app);
require('./app/controllers/description/index')(app);

//app.use(require('./app/controllers/IMG/router'))
    
var porta = 3000;
var servidorLigou = function(){
    console.log('Servidor MVPO_User Rodando na porta ' + porta + '...');
}

app.listen(porta, servidorLigou());
module.exports = app

//* https://mongoosejs.com/docs/connections.html#multiple_connections 
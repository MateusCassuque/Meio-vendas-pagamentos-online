const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User');
const Person = require('../../models/person')

const authConfig = require('../../../config/auth');

const router = express.Router();

//Gerando Token de Autenticacao com json web token
function generatetoken(id){
    return jwt.sign({ id: id }, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        
        if(!users){
            return res.status(404).send({error: 'Users no Found'})
        }

        return res.status(200).send( users )
    } catch (error) {
        res.status(400).send({ error: 'fail to load users: ' + error })
    }
    
})

router.post('/register', async (req, res) => {
    
    //guardando o valor de nome { email } enviado pelo usuario em uma constatnte
    const { email } = req.body;  
    try {

        //verificando se o usuario ja existe por meio de uma consulta
        if (await User.findOne({ email })) {
            return res.status(401).send({ error: 'User already existes' });
        }

        //criar novo usuario com o metodo [create] a partir de todos os parametros do corpo da requisicao enviados
        //pelo usuario
        const user = await User.create(req.body);

        /* ocultando a senha no retorno da rota */
        user.senha = undefined;

        //retornando o usuario criado
        return res.status(201).send({ user, token: generatetoken(user.id) });
    } catch (err) {
        return res.status(400).send({ error: 'registration failed ' + err  });
    }
})

router.post('/authenticate', async (req, res) => {
    const {email, senha} = req.body;
    
    //procurando usuario no banco pelo Email
    const user = await User.findOne({ email }).select('+senha');

    //verificando o o usuario existe, por meio de uma consulta
    if(!user){
        return res.status(404).send({ error: 'user not found' });
    }

    //Comparando a senha Encriptada
    if(!await bcrypt.compare(senha, user.senha)){
        return res.status(401).send({ error: 'invalidate password' });
    }

    //Ocultando a senha no retorno da rota [funcao]
    user.senha = undefined;

    const person = await Person.findOne({user: user._id}).populate('user')

    //retornando o usuario e o token de autenticacao
    return res.status(200).send({person, token: generatetoken(user.id) });

})



module.exports = app => app.use('/auth', router);
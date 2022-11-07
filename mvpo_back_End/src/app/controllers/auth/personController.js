const express = require('express')

const routa = express.Router()

const Pessoa = require('../../models/person')
const User = require('../../models/User')


//importando o meu middleware authMiddleware
const authMiddleware = require('../../middleware/auth')

//Usando o middleware na rota do controller
routa.use(authMiddleware)

//Rota para inserir Pessoa no Banco
routa.post('/', async (req, res) => {
    try{

        const { identification } = req.body

        if(!await User.findById( req.userId )){
            return res.status(404).send({ error: 'User not exist' })
        }


        if(await Pessoa.findOne({ user: req.userId })){
            return res.status(401).send({ error: 'User just is a person' })
        }

      if(await Pessoa.findOne({ identification })){
            return res.status(401).send({ error: 'Person already existe' })
        }

        const pessoa = await Pessoa.create({ ...req.body, user: req.userId })
        
        return res.status(201).send(pessoa)
    }catch(error){
        return res.status(400).send({ error: 'Creating person Error: ' + error })
    }
})

//Rota para buscar todas as pessoas do Banco
routa.get('/', async (req, res) => {
    try{
        const pessoas = await Pessoa.find().populate('user')
        return res.status(200).send(pessoas)

    }catch(error){
        return res.status(400).send({ error: 'loading peaple error: ' + error })
    }
})

//routa para buscar o pessoa pelo id da pessoa
routa.get('/:personId', async (req, res) => {
    try{
        const pessoas = await Pessoa.findById(req.params.personId).populate('user')
        return res.status(200).send(pessoas)

    }catch(error){
        return res.status(400).send({ error: 'loading peaple error: ' + error })
    }
})

//routa para buscar o pessoa pelo id do usuário
routa.get('/user/:userId', async (req, res) => {
    try{
        const pessoas = await Pessoa.findOne({user: req.params.userId}).populate('user')
        return res.status(200).send(pessoas)

    }catch(error){
        return res.status(400).send({ error: 'loading peaple error: ' + error })
    }
})

module.exports = app => app.use('/person', routa);
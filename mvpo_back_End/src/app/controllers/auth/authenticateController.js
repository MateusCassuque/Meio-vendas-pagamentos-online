const express = require('express')

const authMiddleware = require('../../middleware/auth')
const User =  require('../../models/User')
const Person = require('../../models/person')
const Produto = require('../../models/Product')
const Image = require('../../models/Image')

const router = express.Router()

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const token = req.token

        const person = await Person.findOne({user: req.userId}).populate('user')
        
        res.status(200).send({token, person})

    } catch (error) {
        res.status(401)
        res.statusMessage = "A ultima sessao nao foi encontrada!"
        res.send({ erro: 'error on update session: ' + error })
    }
})

router.get('/:userId', async (req,res) => {
    try {
        const users = await User.findOne({_id: req.params.userId})
        
        if(!users){
            return res.status(404).send({error: 'User no Found'})
        }

        return res.status(200).send( users )
    } catch (error) {
        res.status(400).send({ error: 'fail to load users: ' + error })
    }
    
})

//crianmdo uma routa do tipo put com parametros para actualizar um User
router.put('/:userId', async (req, res) => {
    try {
        
        if(!await User.findOne({_id: req.params.userId})){
            return res.status(404).send({error: 'User are not found!'})
        }
        
        if(req.userId != req.params.userId){
            return res.status(401).send({message: "Unhauthorisad"})
        }
        
        const {userNome} = req.body
        const time = Date().toString()

        const user = await User.findByIdAndUpdate(req.params.userId,{
            userNome,
            updated_At: time,
        }, {new:true})

        return res.status(200).send(user)
    } catch (error) {
        res.status(400).send({erro: 'Error to update ' + error})
    }
})


//crianmdo uma routa do tipo delete com parametros para deletar um projecto
router.delete('/:userId', async (req, res) => {
    try{

        if(!await User.findOne({_id: req.params.userId})){
            return res.status(404).send({error: 'User are not found!'})
         }
        
        if(req.userId != req.params.userId){
            return res.status(401).send({message: "Unhauthorisad"})
        }

        const user = await User.findByIdAndDelete(req.params.userId)

        // const person = await Person.findOneAndDelete({user: req.userId})
        // const images = await Person.findOneAndDelete({user: req.userId})

        // const Produtos = await Person.findOneAndDelete({user: req.userId})

        // const
    
        return res.status(200).send({ ok: 'user deleteded sucesseful' })
    }catch(error){
        return res.status(400).send({error: 'Error to deleting user: ' + error})
    }
});

module.exports = app => app.use('/user', router);
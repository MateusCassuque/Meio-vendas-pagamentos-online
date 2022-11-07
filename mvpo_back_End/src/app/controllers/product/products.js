const express = require('express')

const router = express.Router()
const Produto = require('../../models/Product')
//importando o meu middleware authMiddleware
const authMiddleware = require('../../middleware/auth')

//Usando o middleware na rota do controller
router.use(authMiddleware)

//crianmdo uma routa do tipo get sem parametros que vai buscar todos os projectos
router.get('/', async (req, res) => {
    try{
        const produto = await Produto.find().populate(['user', 'description'])

        return res.send(produto)

    }catch(error){
        return res.status(400).send({error: 'Error to loading Projects: ' + error})
    }
});

router.get('/user/:userId', async (req, res) => {
    try{
        const produto = await Produto.find({user: req.params.userId}).populate(['user', 'description'])

        return res.send(produto)

    }catch(error){
        return res.status(400).send({error: 'Error to loading Projects: ' + error})
    }
});

//crianmdo uma routa do tipo get com parametros que vai buscar um ūnico projecto
router.get('/:produtoId', async (req, res) => {
    try{
        const produto = await Produto.findOne({_id:req.params.produtoId}).populate(['user', 'description'])

        return res.send(produto)

    }catch(error){
        return res.status(400).send({error: 'Error to loading Project: ' + error})
    }
});


//crianmdo uma routa do tipo put com parametros para actualizar um projecto
router.put('/:productId', (req, res) => {
    res.send({ userId: req.userId })
});

module.exports = app => app.use('/products', router);
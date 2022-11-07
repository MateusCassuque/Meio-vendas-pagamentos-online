const express = require('express')

const router = express.Router()
const Produto = require('../../models/Product')
const User = require('../../models/User')

//importando o meu middleware authMiddleware
const authMiddleware = require('../../middleware/auth')

//Usando o middleware na rota do controller
router.use(authMiddleware)

//crianmdo uma routa do tipo pot sem parametros que vai criar um novo produto
router.post('/', async (req, res) => {
    try {
        
    const authUser = await User.findOne({_id: req.userId})
    if(!authUser){ return res.status(404).send({error: 'User not found!'})}

        const {name, description, images, type, preco, estado, quantidade} = req.body
        const produto = await Produto.create({ name, description, user: req.userId, images, type, preco, estado, quantidade })


        /*
        await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: produto._id, assignedTo: req.userId })

                await projectTask.save()
                produto.tasks.push(projectTask)
            }))

        await produto.save() */
        const products = authUser.products

        products.push(produto._id)
        const time = Date().toString()
        
        const user = await User.findByIdAndUpdate(authUser._id,{
            products,
            updated_At: time,
        }, {new:true})

        return res.status(200).send(produto)
    } catch (error) {
        res.status(400).send({ error: 'Error creating new project: ' + error })
    }
});

//crianmdo uma routa do tipo delete com parametros para deletar um produto
router.delete('/:productId', async (req, res) => {
    try{
        const product = await Produto.findByIdAndDelete(req.params.ProductId)
    
        return res.status(200).send({ ok: 'Produto deleteded sucesseful' })
    }catch(error){
        return res.status(400).send({error: 'Error to deleting Produto: ' + error})
    }
});

module.exports = app => app.use('/products', router);


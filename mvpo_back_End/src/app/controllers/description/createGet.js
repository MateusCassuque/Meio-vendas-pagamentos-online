const express = require('express')
const description = require('.')
const router = express.Router()

const Imagem = require('../../models/Image')
const Product = require('../../models/Product')
const Description = require('../../models/Description')

router.post('/image/:imagemId', async (req, res) => {
    try {
        

        if(await Description.findOne({image: req.params.imagemId})){
            const t = await Description.findOne({image: req.params.imagemId})

            console.log(t)

            return res.status(401).send({erro: 'Description already exite'})
        }

        const {
            detalhe
        } = req.body

        const tipo = "Descrição de uma imagem"

        const description = await Description.create({
            detalhe,
            tipo,
            image: req.params.imagemId
        })

        return res.status(201).send(description)
    } catch (error) {
        return res.status(400).send({erro: 'Erro to create description ' + error})
    }
})

router.post('/product/:productId', async (req, res) => {
    try {
        
        if(await Description.findOne({product: req.params.productId})){
            const t = await Description.findOne({product: req.params.productId})

            return res.status(401).send({erro: 'Description already exite'})
        }

        const {
            tipo, 
            autor, 
            editora,
            produtora,
            album,
            numFaixa,
            lancadoEM,
            color,
            tamanho,
            peso,
            detalhe
        } = req.body
    
        const description = await Description.create({
            tipo, 
            autor, 
            editora,
            produtora,
            album,
            numFaixa,
            lancadoEM,
            color,
            tamanho,
            peso,
            detalhe,
            product: req.params.productId
        })

        const product = await Product.findOne({_id: req.params.productId})

        product.description = description._id
        product.save()
    
        return res.status(201).send(description)
    } catch (error) {
        return res.status(400).send({erro: 'Error to create description ' + error})
    }
})

router.get('/', async (req, res) => {
    try {
        const descriptions = await Description.find()

        if((!descriptions) || (description.length == 0)){
            return res.status(404).send({warning: 'description not found!'})
        }

        res.status(200).send(descriptions)
    } catch (error) {
        return res.status(400).send({error: 'Error to search descriptions ' + error})
    }
})

router.get('/image/:imageId', async (req, res) => {
    try {
        const description = await Description.findOne({image: req.params.imageId})

        if(!description){
            return res.status(404).send({warning: 'image description not found!'})
        }

        res.status(200).send(description)
    } catch (error) {
        return res.status(400).send({error: 'Error to search descriptions ' + error})
    }
})

router.get('/product/:productId', async (req, res) => {
    try {
        const description = await Description.findOne({product: req.params.productId})

        if(!description){
            return res.status(404).send({warning: 'product description not found!'})
        }

        res.status(200).send(description)
    } catch (error) {
        return res.status(400).send({error: 'Error to search descriptions ' + error})
    }
})

module.exports = app => app.use('/description', router);
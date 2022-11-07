const express = require('express')
const description = require('.')
const router = express.Router()

// const Imagem = require('../../models/Imagem')
// const Product = require('../../models/Product')
const Description = require('../../models/Description')
const product = require('../product')

router.put('/:descriptionId', async (req, res) => {
    try {
        
        if(!await Description.findOne({_id: req.params.descriptionId})){
            return res.status(404).send({erro: 'Description not found'})
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
    
        const description = await Description.findOneAndUpdate(req.params.descriptionId, {
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
        }, {new: true})
    
        return res.status(202).send(description)
    } catch (error) {
        return res.status(400).send({erro: 'Error to create description ' + error})
    }
})

module.exports = app => app.use('/description', router);
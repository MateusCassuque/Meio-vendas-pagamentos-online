const router = require('express').Router()
const multer = require('multer')

const multerConfig = require('../../../config/imgProduto')
const Imagem = require('../../models/Image')
const Produto = require('../../models/Product')

const authMidleware = require('../../middleware/auth')

router.use(authMidleware)

router.post('/:produtoId', multer(multerConfig).single('file'), async (req, res) => {
    
    const produto = await Produto.findOne({_id: req.params.produtoId})

    if(!produto){return res.status(404).send({error: 'Product not found'})}

    const {originalname: name, size, filename: key} = req.file
    
    const person = false

    const {active} = req.body

    if(active){
        
        const fotos = await Imagem.find({product: req.params.produtoId, active: true})
        
        if(fotos.length > 0){
            await Promise.all(fotos.map(foto => {
                foto.active = false
                foto.save()
            }))
        }
        
    }
    
    try {
        const imagem = await Imagem.create({
            name, size, 
            key, 
            person, 
            product: req.params.produtoId,
            active,
        })

        produto.images.push(imagem._id)

        await produto.save()
        
        return res.status(200).send({imagem})

    } catch (error) {
        return res.status(400).send({erro: 'Error to send image: ' + error})
    }

})

router.get('/', async (req, res) => {
    try {
        const fotos = await Imagem.find({person: false})

        return res.status(200).send({fotos})
    } catch (error) {
        return res.status(400).send({erro: 'Error to search image: ' + error})
    }
})

router.get('/:productId', async (req, res) => {
    try {
        const fotos = await Imagem.find({product: req.params.productId})

        return res.status(200).send(fotos)
    } catch (error) {
        return res.status(400).send({erro: 'Error to search image: ' + error})
    }
})

module.exports = app => app.use('/produtoImg', router)
const router = require('express').Router()
const multer = require('multer')

const multerConfig = require('../../../config/imgUser')
const Imagem = require('../../models/Image')
const User = require('../../models/User')

const authMidleware = require('../../middleware/auth')

router.use(authMidleware)

// Rota Post, para salvar uma imagem no sistema e cadastrar no banco

// endereço / tipo post. serve para cadatrar uma foto no perfil e marcar ela como a única activa paro o usuário logado! 

// Rota Get, para buscar as imagens no banco de dados

// endereço Get /, usei para buscar e contar todas as imagens do banco, independentemente da categória ou tipo!

router.get('/:fotoId', async (req, res) =>{
    try {
        const foto = await Imagem.findById({_id : req.params.fotoId})
        
        if(foto){
            res.status(200).send(foto)
        }else{
            res.status(404).send({message: 'Erro, image not found: ' + req.params.fotoId})
        }
    } catch (error) {
        res.status(400).send({error: 'Error to search Image by Id'})
    }
})

router.delete('/:fotoId', async (req, res) => {
    try {
        const foto = await Imagem.findByIdAndDelete({_id: req.params.fotoId})

        if(foto){
            res.status(200).send({Ok: 'Sucesseful on delete image: ' + req.params.fotoId})
        }else{
            res.status(404).send({message: 'Erro, image not found: ' + req.params.fotoId})
        }
        
    } catch (error) {
        res.status(400).send({error: 'error to remove image'})
    }
})

module.exports = app => app.use('/image', router)
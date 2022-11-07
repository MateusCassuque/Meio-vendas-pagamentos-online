const router = require('express').Router()
const multer = require('multer')

const multerConfig = require('../../../config/imgUser')
const Imagem = require('../../models/Image')
const User = require('../../models/User')

const authMidleware = require('../../middleware/auth')

router.use(authMidleware)

// Rota Post, para salvar uma imagem no sistema e cadastrar no banco

// endereço / tipo post. serve para cadatrar uma foto no perfil e marcar ela como a única activa paro o usuário logado! 

router.post('/', multer(multerConfig).single('file'), async (req, res) => {

    const authUser = await User.findOne({_id: req.userId})
    if(!authUser){ return res.status(404).send({error: 'User not found!'})}

    const {originalname: name, size, filename: key} = req.file

    const active = true
    const perfil = true

    const person = true

    const fotos = await Imagem.find({user: req.userId, active: true, perfil: true})

    if(fotos.length > 0){
        await Promise.all(fotos.map(foto => {
            foto.active = false
            foto.save()
        }))
    }
   
    try {
        const imagem = await Imagem.create({
            name, size, 
            key, 
            person, 
            user: req.userId,
            active,
            perfil
        })

        const images = authUser.images

        images.push(imagem._id)
        const time = Date().toString()
        
        const user = await User.findByIdAndUpdate(authUser._id,{
            images,
            updated_At: time,
        }, {new:true})
        
        res.status(200).send({imagem})

    } catch (error) {
        res.status(400).send({erro: 'Error to send image: ' + error})
    }

})

// endereço / tipo post. serve para cadatrar uma foto de Capa e marcar ela como a única activa paro o usuário logado! 

router.post('/capa', multer(multerConfig).single('file'), async (req, res)=>{
    
    const authUser = await User.findOne({_id: req.userId})
    if(!authUser){ return res.status(404).send({error: 'User not found!'})}

    const {originalname: name, size, filename: key} = req.file

    const active = true
    const capa = true

    const person = true

    const fotos = await Imagem.find({user: req.userId, active: true, capa: true})

    if(fotos.length > 0){
        await Promise.all(fotos.map(foto => {
            foto.active = false
            foto.save()
        }))
    }
   
    try {
        const imagem = await Imagem.create({
            name, size,
            key, 
            person, 
            user: req.userId, 
            active,
            capa
        })
        
        const images = authUser.images

        images.push(imagem._id)
        const time = Date().toString()
        
        const user = await User.findByIdAndUpdate(authUser._id,{
            images,
            updated_At: time,
        }, {new:true})
        
        res.status(200).send({imagem})

    } catch (error) {
        res.status(400).send({erro: 'Error to send image: ' + error})
    }

})

// Rota Get, para buscar as imagens no banco de dados

// endereço Get /, usei para buscar e contar todas as imagens do banco, independentemente da categória ou tipo!

router.get('/', async (req, res) =>{
    
    const imagem = {}

    try {
        const fotos = await Imagem.find({person: true})
        
        imagem.total = fotos.length
        
    } catch (error) {
        res.status(400).send({erro: 'Error to search images'})
    }
    

    try {
        const fotosPerfil = await Imagem.find({perfil:true})
        const totalPerfil = fotosPerfil.length

        const perfil = {}
        perfil.total =  totalPerfil
        
        perfil.fotos = fotosPerfil
        imagem.perfil = perfil
    } catch (error) {
        res.status(400).send({erro: 'Error to search perfil images'})
    }

    try {
        const fotosCapa = await Imagem.find({capa:true})
        const totalCapa = fotosCapa.length

        const capa ={}
        capa.total = totalCapa
        
        capa.fotos = fotosCapa
        imagem.capa = capa
        
    } catch (error) {
        res.status(400).send({erro: 'Error to search back images'})
    }

    res.status(200).send({"Imagens de Usuários" : imagem})
})

router.get('/perfil/:userId', async (req, res) =>{
    try {
        const fotos = await Imagem.find({user: req.params.userId, active: true, perfil: true})
        const foto = fotos[0]
        
        if(foto){
            res.status(200).send(foto)
        }else{
            res.status(404).send({message: 'Error, image not found: ' + req.params.userId})
        }
    } catch (error) {
        res.status(400).send({error: 'Error to search Image by Id'})
    }
})

router.get('/capa/:userId', async (req, res) =>{
    try {
        const fotos = await Imagem.find({user: req.params.userId, active: true, capa: true})
        const foto = fotos[0]
        
        if(foto){
            res.status(200).send(foto)
        }else{
            res.status(404).send({message: 'Error, image not found: ' + req.params.userId})
        }
    } catch (error) {
        res.status(400).send({error: 'Error to search Image by Id'})
    }
})

module.exports = app => app.use('/userImg', router)
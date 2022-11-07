const express = require('express')

const Paise = require('../../models/Paise')
const Provincia = require('../../models/Provincia')
const Municipio = require('../../models/Municipio')
const Bairro = require('../../models/Bairro')
const Rua = require('../../models/Rua')
const Endereco = require('../../models/Endereco')

const router = express.Router()

var endereco = {
    pais : {},
    provincia : {},
    municipio : {},
    bairro : {},
    rua : {},
}
router.post('/', async (req, res) => {
    try {
        const { pais, provincia, municipio, bairro, rua, continente } = req.body

        /** Varificando pelo pais inserido  no banco. caso n exista vai criar um
         * e vai atribui-la ao objecto endereco que definimos fora da rota: 
         * var endereco = {
            pais : {},
            provincia : {},
            municipio : {},
            bairro : {},
            rua : {},
            }
         */
        if(!await Paise.findOne({ pais })){
            endereco.pais = await Paise.create({ pais, continente })
        }
        endereco.pais = await Paise.findOne({pais})
        
        /**Verificando se a provincia inserida ja existe no banco, 
         * caso n vai criar uma e atribuir ao pais 
         */
        if(!await Provincia.findOne({ provincia })){
           endereco.provincia = await Provincia.create({ provincia, paise: endereco.pais._id })
           await endereco.pais.provincias.push(endereco.provincia)
        }
        endereco.provincia = await Provincia.findOne({ provincia })
        await endereco.pais.save()

        /**Verificando se o municipio inserido ja existe no banco, 
         * caso n vai criar um e atribuir a Provincia 
         */
         if(!await Municipio.findOne({ municipio })){
            endereco.municipio = await Municipio.create({ municipio, provincia: endereco.provincia._id })
            await endereco.provincia.municipios.push(endereco.municipio)
        }
        endereco.municipio = await Municipio.findOne({ municipio })
        await endereco.provincia.save()

        /**Verificando se o bairro inserido ja existe no banco, 
         * caso n, vai criar um e atribuir ao municipio 
         */
         if(!await Bairro.findOne({ bairro })){
            endereco.bairro = await Bairro.create({ bairro, municipio: endereco.municipio._id })
            await endereco.municipio.bairros.push(endereco.bairro)
        }
        endereco.bairro = await Bairro.findOne({ bairro })
        await endereco.municipio.save()

        /**Verificando se a rua inserida ja existe no banco, 
         * caso n, vai criar uma e atribuir ao bairro 
         */
         if(!await Rua.findOne({ rua })){
            endereco.rua = await Rua.create({ rua, bairro: endereco.bairro._id })
            await endereco.bairro.ruas.push(endereco.rua)
        }
        endereco.rua = await Rua.findOne({ rua })
        await endereco.bairro.save()


        const nvEndereco = await Endereco.find()
        //console.log(nvEndereco)
        
        await Promise.all(nvEndereco.map(async end => {

            const endPais = JSON.stringify(end.pais)
            const EnderecoPais_id = JSON.stringify(endereco.pais._id)

           if(endPais == EnderecoPais_id){
              return console.log('achei') 
           }
        }))

        //console.log(nvEndereco)




        const novoendereco = await Endereco.create({ 
            pais: endereco.pais._id, 
            provincia: endereco.provincia._id,
            municipio: endereco.municipio._id,
            bairro: endereco.bairro._id,
            rua: endereco.rua._id
         })

        //Enviando um endereco como retorno da rota
        return res.status(200).send(novoendereco)
       
    } catch (error) {
        console.log(error)
        res.status(401).send({erro: "Create address error: " + error})        
    }
})

router.get('/', async (req, res) => {
    try {
        
        endereco.pais = await Paise.find()
        endereco.provincia = await Provincia.find()
        endereco.municipio = await Municipio.find()
        endereco.bairro = await Bairro.find()
        endereco.rua = await Rua.find()

        res.status(200).send({ endereco })
    } catch (error) {
        res.status(401).send({ Erro: "Address loading error: " + error })
    }
});

router.get('/pais', async (req, res) => {
    try {
        
        const paises = await Paise.find().populate('provincias')

        res.status(200).send({ paises })
    } catch (error) {
        res.status(401).send({ Erro: "Address loading error: " + error })
    }
})

router.get('/pais/:name', async (req, res) => {
    try {
        const paises = await Paise.findOne({pais: req.params.name}).populate('provincias')
        
       // console.log(paises) 

        res.status(200).send({ paises })
    } catch (error) {
        res.status(401).send({ Erro: "Address loading error: " + error })
    }
})

router.get('/pais/:paisName/:provinciaName', async (req, res) => {
    try {
        let local = {
            pais: {},
            provincia: {
                municipios:[{}]
            }
        }

        const paise = await Paise.findOne ({pais: req.params.paisName})
        //const provincias = await Provincia.findOne({provincia: req.params.name}).populate('municipios')
        
        local.pais = paise

        await Promise.all(paise.provincias.map(async pro => {
            const _provincia = await Provincia.findById(pro).populate('municipios')
           if(_provincia.provincia == req.params.provinciaName)
                local.provincia = _provincia
        }))

         res.status(200).send({ local })
    } catch (error) {
        res.status(401).send({ Erro: "Address loading error: " + error })
    }
})

module.exports = appAddress => appAddress.use('/address', router)
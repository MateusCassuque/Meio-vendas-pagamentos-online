const mongoose = require('../../database')

const enderecoSchema = mongoose.Schema({
    pais: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Paise'
    },
    provincia: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Provincia'
    },
    municipio: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Municipio'
    },
    bairro: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bairro'
    },
    rua: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Rua'
    },
    created_At: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_At: {
        type: Date,
        default: Date.now,
        required: true
    }
})
const Endereco = mongoose.model('Endereco', enderecoSchema)
module.exports = Endereco
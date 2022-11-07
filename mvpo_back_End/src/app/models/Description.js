const mongoose = require('../../database')

const ProdutSchema = mongoose.Schema({
    tipo: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
    },
    produtora: {
        type: String,
    },
    editora: {
        type: String,
    },
    album: {
        type: String,
    },
    numFaixa:{
        type: Number,
    },
    color: String,
    tamanho: String,
    peso: String,
    detalhe: String,
    lancadoEM: {
        type: Date,
        default: Date.now
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Imagem',
    }
})
const Produt = mongoose.model('Description', ProdutSchema);

module.exports = Produt;
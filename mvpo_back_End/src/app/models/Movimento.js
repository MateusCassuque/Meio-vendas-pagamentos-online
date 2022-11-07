const mongoose = require('../../database')

const movimentoSchema = mongoose.Schema({
    descricao: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    remitente: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ContaBancaria',
        required: true
    },
    
    beneficiario: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ContaBancaria',
        required: true
    },

    valor:{
        Type: Number,
        required: true,
    }
})

const Movimento = mongoose.model('Movimento', movimentoSchema)

module.exports = Movimento
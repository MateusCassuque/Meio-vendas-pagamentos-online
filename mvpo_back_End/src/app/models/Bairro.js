const mongoose = require('../../database')

const bairroSchema = mongoose.Schema({
    bairro: {
        type: String,
        required: true
    },
    municipio: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Municipio'
    },
    ruas: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Rua'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})
const Bairro = mongoose.model('Bairro', bairroSchema)
module.exports = Bairro
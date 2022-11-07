const mongoose = require('../../database')

const municipioSchema = mongoose.Schema({
    municipio: {
        type: String,
        required: true
    },
    provincia: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Provincia'
    },
    bairros: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Bairro'
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

const Municipio = mongoose.model('Municipio', municipioSchema)
module.exports = Municipio
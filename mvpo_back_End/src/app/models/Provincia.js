const mongoose = require('../../database')

const provinciaSchema = mongoose.Schema({
    provincia: {
        type: String,
        required: true
    },
    paise: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Paise'
    },
    municipios: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Municipio'
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

const Provincia = mongoose.model('Provincia', provinciaSchema)
module.exports = Provincia
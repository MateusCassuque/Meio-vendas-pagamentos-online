const mongoose = require('../../database')

const paiseSchema = mongoose.Schema({
    pais: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    continente: {
        type: String 
    },
    provincias: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Provincia'
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

const Paise = mongoose.model('Paise', paiseSchema)
module.exports = Paise
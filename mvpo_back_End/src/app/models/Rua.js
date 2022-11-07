const mongoose = require('../../database')

const ruaSchema = mongoose.Schema({
    rua: {
        type: String,
        required: true
    },
    bairro: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bairro'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

const Rua = mongoose.model('Rua', ruaSchema)
module.exports = Rua
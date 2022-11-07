const mongoose = require('../../database')

const ProdutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Description',
    },
    type: {
        type: Boolean,
        required: true,
        default: false
    },
    preco: {
        type: Number,
        required: true,
        default: 0.00
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    quantidade: {
        type: Number,
        rquired: true,
        default: 1000,
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
const Produt = mongoose.model('Produt', ProdutSchema);

module.exports = Produt;
const mongoose = require('../../database')

const contaBancariaSchema = mongoose.Schema({
    titular: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Person',
        required: true
    },

    saldo: {
        type: Number,
        required: true,
        default: 0.00
    },

    movimentos: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Movimento'
        }
    ],

    created_At: {
        type: Date,
        default: Date.now
    },

    updated_At: {
        type: Date,
        default: Date.now
    },
})

const ContaBancaria = mongoose.model('ContaBancaria', contaBancariaSchema);

module.exports = ContaBancaria;
const mongoose = require('../../database')

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Date,
        required: true,
        default: "1999-01-01"

    },
    identification: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
}) 

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
const mongoose = require('../../database')

const ImageSchema = mongoose.Schema({
    name: String,
    size: Number,
    
    key: String,
    
    person: Boolean,
    perfil: Boolean,
    active: Boolean,
    capa: Boolean,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}) 

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
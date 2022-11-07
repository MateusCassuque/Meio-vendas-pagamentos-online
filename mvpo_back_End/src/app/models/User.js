const mongoose = require('../../database')

const bcript = require('bcryptjs')

const userSchema = mongoose.Schema({
    userNome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    created_At: {
        type: Date,
        default: Date.now
    },
    updated_At: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product'
        }
    ],
    images: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Image'
        }
    ]
})

userSchema.pre('save', async function(next){
  const hash = await bcript.hash(this.senha, 10);
  this.senha = hash;
  
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose')
const argon2 = require('argon2')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    avatarUrl: { type: String, default: '' },
    lastUpdate: { type: Date, default: '' },
    refreshTokens: { type: [String], default: [] }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await argon2.hash(this.password);
        next()
    } catch (error) {
        next(error)
    }
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User
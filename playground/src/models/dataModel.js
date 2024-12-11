const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String }
})

const userData = mongoose.model('userData', dataSchema, 'userData')

module.exports = userData
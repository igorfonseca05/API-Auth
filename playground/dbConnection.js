const mongoose = require('mongoose')
const EventEmitter = require('events')

let dbEvent = new EventEmitter()

function DBconnection(url) {
    mongoose.connect(url)
        .then(() => {
            console.log('base conectada')
            dbEvent.emit('conectada')
        })
        .catch(error => {
            console.log('Error ao conectar')
        })
}

module.exports = { DBconnection, dbEvent }
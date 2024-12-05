
const mongoose = require("mongoose");
const EventEmitter = require('events')

const dbEvents = new EventEmitter()

function getDatabaseConnection(url) {
    mongoose.connect(url)
        .then(res => {
            console.log('connected')
            dbEvents.emit('Connected')
        }).catch((error) => {
            console.log('Error ao conectar', error.message)
        })
}

module.exports = { getDatabaseConnection, dbEvents }
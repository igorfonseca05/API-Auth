
const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

const connection = 'mongodb://127.0.0.1:27017'
const databaseName = 'users'

mongoClient.connect(connection)
    .then(client => {
        const db = client.db(databaseName)

        const users = db.collection('users').find({})

        console.log(users)
    })
    .catch(error => {
        console.log(error)
    })
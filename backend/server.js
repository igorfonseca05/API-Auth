require('dotenv').config()

// Pacotes
const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const pino = require('pino')
const pinoHttp = require('pino-http')

// Rotas
const routes = require('./src/routes/routes')

const app = express()
const { getDatabaseConnection, dbEvents } = require('./src/database/dbService')

//criar logs das requisições
const logger = pino({
    level: 'info', // Defina o nível do log, como 'info', 'debug', 'error', etc.
}, pino.destination('./logs/app.json'))

// conectar na base de dados
getDatabaseConnection(process.env.URL_DB)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Permite solicitações do frontend
    credentials: true,
}))
app.use(pinoHttp({ logger }));


app.use(routes)
dbEvents.on('Connected', () => {
    app.listen(3100, () => {
        logger.info('Servidor iniciado')
        console.log('servidor ON')
        console.log('Acesse http://localhost:3100')
    })
})
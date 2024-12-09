const pino = require('pino')


const logger = pino({
    level: 'info', /**Define o nivel do log, como 'infor', 'debug, 'error'. etc. */
    transport: {
        target: 'pino-pretty', /**Melho a legibilidade dos logs no console */
        options: {
            colorize: true /**Modifica as cores no log */
        }
    }
})

module.exports = logger
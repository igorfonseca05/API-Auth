
const logger = require('../utils/logger')

const logRequest = (req, res, next) => {
    logger.info('Request de entrada', {
        method: req.method, // Método HTTP (GET, POST, etc.)
        url: req.originalUrl, // URL solicitada
        headers: req.headers, // Cabeçalhos da requisição
        body: req.body, // Corpo da requisição (para POST, PUT, etc.)
        query: req.query, // Query params
        timestamp: new Date().toISOString(),
    });

    next()
}

module.exports = logRequest
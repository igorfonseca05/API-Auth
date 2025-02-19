const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


async function verifyToken(req, res, next) {

    try {
        // Obter Token
        const token = req.cookies.auth_token || req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Acesso negado, token ausente",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "non-existent token",
                    details: "Token não enviado na requisição"
                }
            })
        }

        // Decodificar e verificar o Token
        const userInfoDecoded = jwt.verify(token, process.env.JWT_TOKEN)

        // Verificando se os dados do user estão na base de dados
        const userId = userInfoDecoded.id
        const user = await User.findById(userId)
        if (!user) {
            // Enviando resposta ao frontend para
            // remover o token caso usuário não exista
            res.clearCookie("auth_token", {
                path: '/',
                httpOnly: true,
                secure: true,
            })

            return res.status(401).json({
                status: "error",
                message: "Usuário não encontrado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "unknown user",
                    details: "Os dados associados a essa email não foram encontrados"
                },
                timeStamps: new Date().toISOString()
            })
        }

        // console.log(user)

        req.body = {
            ...req.body,
            id: user._id
        }

        next()

    } catch (error) {

        res.clearCookie('auth_token', {
            path: '/',
            httpOnly: true,
            secure: true
        })

        if (error.message.includes('invalid signature') || error.message.includes("invalid token"))
            return res.status(403).json({
                status: "error",
                message: "Token inválido",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: error.name || "unknow error",
                    details: error.message
                },
                timeStamps: new Date().toISOString()
            })
    }
}

module.exports = verifyToken

const User = require('../models/userModel')
// const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const bcrypt = require('bcrypt')


// END-POINT DE SIGNOUT
exports.signout = async (req, res) => {

    try {
        // Verifica se Token foi enviado
        const tokenSentByCookie = req.cookies.refresh_token
        const tokenSentByHeader = req.headers.authorization?.replace('Bearer ', '')
        const refreshToken = tokenSentByCookie || tokenSentByHeader

        if (!refreshToken) {
            return res.status(400).json({
                status: "error",
                message: "RefreshToken token não fornecido",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O token de refreshToken não foi fornecido na requisição"
                }
            });
        }

        // Decodifica dados do Token e busca na base de dados
        const userTokenDecoded = jwt.verify(refreshToken, process.env.JWT_TOKEN)
        console.log(userTokenDecoded)
        const userTokenId = userTokenDecoded._doc._id
        const userData = await User.findById(userTokenId)

        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "usuário não encontrado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O usuário associado ao token de refreshToken não foi encontrado"
                }
            })
        }

        // Removendo token fornecido no login quando fizer signOut
        userData.refreshTokens = [...userData.refreshTokens].filter(token => token !== refreshToken)
        await userData.save()

        res.clearCookie('refresh_token', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        return res.status(200).json({ message: 'Logout realizado com sucesso!' });

    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Error ao tentar realizar o logout",
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "unknowleged",
                details: error.message
            }
        })
    }
}


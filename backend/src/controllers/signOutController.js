
const User = require('../models/userModel')
// const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const bcrypt = require('bcrypt')


// END-POINT DE SIGNOUT
exports.signout = async (req, res) => {

    try {
        const userAuth = req.cookies.auth_token
        const tokenSentByCookie = req.cookies.refresh_token
        const tokenSentByHeader = req.headers.authorization?.replace('Bearer ', '')
        const refresh = userAuth || tokenSentByCookie || tokenSentByHeader
        if (!refresh) {
            return res.status(400).json({
                status: "error",
                message: "Refresh token não fornecido",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O token de refresh não foi fornecido na requisição"
                }
            });
        }

        const userInfoDecoded = jwt.verify(refresh, process.env.JWT_TOKEN)
        const userId = userInfoDecoded._doc._id
        const userData = await User.findById(userId)
        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "usuário não encontrado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O usuário associado ao token de refresh não foi encontrado"
                }
            })
        }

        userData.refreshTokens = [...userData.refreshTokens].filter(token => token !== refresh)
        await userData.save()

        /**Caso o usuário não tenha */
        if (req.cookie.auth_token) {
            res.clearCookie('auth_token', {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })

            return res.status(200).json({ message: 'Logout realizado com sucesso!' });

        }

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
            ok: false
        })
    }
}


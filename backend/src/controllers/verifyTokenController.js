
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.accessToken = async (req, res) => {

    try {
        const refreshToken = req.cookies.refresh_token

        if (!refreshToken) {
            return res.status(403).json({
                status: "error",
                message: "Error ao validar accessToken",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "Usuário não possui refresh Token"
                }
            })
        }

        const accessToken = req.headers.authorization?.replace('Bearer ', '')

        // Verifica se token foi enviado
        if (!accessToken) {
            return res.status(403).json({
                status: "error",
                message: "access token não fornecido",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "AccessToken não foi fornecido na requisição"
                }
            })
        }

        // Verifica o accessToken enviado
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)

        console.log(decoded)

        if (!decoded) {
            return res.status(401).json({
                status: "error",
                message: "Access token inválido ou expirado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Invalid accessToken",
                    details: err.message
                }
            })
        }

        const userExist = await User.findById(decoded.id)
        if (!userExist) {
            return res.status(404).json({
                status: "error",
                message: "Usuário não encontrado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "User not found",
                    details: "Usuário não encontrado, verifique os dados inseridos ou cadastre-se"
                }
            })
        }

        const user = {
            ...userExist._doc,
            access_token: accessToken,
            generatedIn: new Date()
        }

        delete user.refreshTokens
        delete user.password

        return res.status(200).json({
            status: 'success',
            message: 'Token válido',
            statusCode: res.statusCode,
            ok: true,
            user,
        })


    } catch (error) {
        res.status(404).json({
            status: 'Error',
            message: error.message,
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: error.name,
                details: error.message

            },
            user: null
        })
    }
}


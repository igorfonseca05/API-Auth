
const jwt = require('jsonwebtoken')


exports.accessToken = (req, res) => {

    try {
        const accessToken = req.headers.authorization?.replace('Bearer ', '')

        if (!accessToken) {
            return res.status(401).json({
                status: "error",
                message: "access token não fornecido",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O token de acesso não foi fornecido na requisição"
                }
            })
        }

        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(401).json({
                status: "error",
                message: "Acess token inválido ou expirado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O access token enviado não coincide com o token gerado pelo servidor ou está expirado!"
                }
            })

            res.status(200).json({
                status: 'success',
                message: 'Token válido',
                statusCode: res.statusCode,
                ok: true,
                user
            })
        })

    } catch (error) {
        console.log(error)
    }
}


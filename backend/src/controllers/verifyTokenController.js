
const jwt = require('jsonwebtoken')


exports.accessToken = (req, res) => {

    try {
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
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(401).json({
                status: "error",
                message: "Access token inválido ou expirado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Invalid accessToken",
                    details: err.message
                }
            })
            // console.log(user)

            res.status(200).json({
                status: 'success',
                message: 'Token válido',
                statusCode: res.statusCode,
                ok: true,
                user: {
                    ...user,
                    access_token: accessToken,
                    generatedIn: new Date()
                },
            })
        })

    } catch (error) {
        res.status(404).json({
            status: 'Error',
            message: error.message,
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "Unknow error",
                details: error.message

            },
            user: null
        })
    }
}


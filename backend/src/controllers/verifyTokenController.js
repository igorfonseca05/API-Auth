
const jwt = require('jsonwebtoken')

exports.verifyUserToken = (req, res) => {

    // console.log(req.body)

    res.status(200).json({
        status: 'success',
        message: 'Token valido',
        statusCode: res.statusCode,
        ok: true,
        user: {
            ...req.body
        },
        session: {
            ipAddress: req.ip,
            device: req.headers['user-agent'],
        }
    })
}

exports.accessToken = (req, res) => {

    try {
        const accessToken = req.headers.authorization?.replace('Bearer ', '')

        if (!accessToken) return res.status(401).json({ error: 'Access Token não enviado' })

        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(404).json({ error: 'Access token inválido' })

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

exports.msg = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'oi',
        statusCode: res.statusCode,
        ok: true,
    })
}
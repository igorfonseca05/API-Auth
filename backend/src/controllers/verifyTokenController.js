
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
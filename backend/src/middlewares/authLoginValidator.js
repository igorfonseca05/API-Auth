
const validator = require('validator')

function loginValidator(req, res, next) {

    const { email, password } = req.body

    if (!email || !validator.isEmail(email)) {
        return res.status(401).json({ Error: "Email inválido" })
    }

    if (!password || !validator.isLength(password, { min: 6 })) {
        return res.status(401).json({ Error: "Senha deve conter no mínimo 6 caracteres" })
    }

    next()

}

module.exports = loginValidator
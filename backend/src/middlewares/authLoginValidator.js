
const validator = require('validator')

function loginValidator(req, res, next) {

    const { email, password } = req.body

    if (!email || !validator.isEmail(email)) {
        return res.status(401).json({
            status: "error",
            message: "Formato de email inválido",
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "Unauthorized",
                details: "Email não atende requisitos para cadastro, verifique-o!"
            }
        })
    }

    if (!password || !validator.isLength(password, { min: 6 })) {
        return res.status(401).json({
            status: "error",
            message: "Senha deve conter no mínimo 6 caracteres",
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "Unauthorized",
                details: "Senha muito curta, verifique os dados inseridos!"
            }
        })
    }

    next()

}

module.exports = loginValidator
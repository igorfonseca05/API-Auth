
const validator = require('validator')

function validation(req, res, next) {

    const { name, email, password, confirmPassword } = req.body

    // if (password !== confirmPassword) {
    //     return res.status(404).json({ Error: 'As senhas devem coincidir' })
    // }

    if (!name || name.length <= 3) {
        return res.status(401).json({ Error: 'Nome deve possuir mais de 3 caracteres' })
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(401).json({ Error: "Email inválido" })
    }

    if (!password || !validator.isLength(password, { min: 6 })) {
        return res.status(401).json({ Error: "Senha deve conter no mínimo 6 caracteres" })
    }

    next()

}

module.exports = validation
const User = require("../backend/src/models/userModel")

exports.signUp = async (req, res) => {

    const { name, email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (user) return res.status(401).json({ message: 'Usuário já cadastrado' })

        const newUser = new User({ name, email, password })
        await newUser.save()

        const token = await jwt.sign({ id: user._id, name: user.name }, process.env.TOKEN, { expireIn: '1h' })

        res
            .cookie('auth_Token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000
            })
            .status(200)
            .json({ massage: 'Cadastro criado com sucesso' })

    } catch (error) {
        console.log('error')
    }

}


exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        const refreshTokens = []

        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'Usuário não cadastrado' })

        const isValidPassword = await argon2.verify(user.password, password)
        if (!isValidPassword) return res.status(404).json({ message: 'Senha incorreta' })

        const accessToken = await jwt.sign({}, processes.env.JWT_ACCESS_TOKEN, { expireIn: '15m' })
        const refreshToken = await jwt.sign({}, processes.env.JWT_REFRESH_TOKEN, { expireIn: '7d' })

        refreshTokens.push(refreshToken)

        try {
            user.RefreshTokenContainer = [...refreshToken]
            await user.save()
        } catch (error) {
            console.log('Error ao adicionar token na base de dados')
        }

        console.log('oi')

        res.cookie("refresh_Token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600
        }).status(404)
            .json({ message: "Login realizado com sucesso", accessToken })

    } catch (error) {
        return res.status(404).json({ Error: 'Error ao fazer login' })
    }
}

exports.refreshToken = (req, res, next) => {

    const refresh = req.cookie.refreshToken || req.headers.authorization?.replace('Bearer ', '')

    if (!refresh || !RefreshTokenContainer.includes(refresh)) {
        return res.status(403).json({ Error: 'Refresh token inválido' })
    }

    jwt.verify(refresh, process.env.REFRESH_TOKEN, (error, user) => {
        if (error) {
            return res.status(403).json({ Error: 'O Refresh token não é válido' })
        }

        const acessToken = jwt.sign({ username: user.username }, process.env.ACESS_TOKEN, { expireIn: '15min' })

        req.body.acessToken = acessToken

        next()
    })

}
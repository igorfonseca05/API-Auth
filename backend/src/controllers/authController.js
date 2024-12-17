const User = require('../models/userModel')
// const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const bcrypt = require('bcrypt')


const secretToken = process.env.JWT_TOKEN

let refreshTokenContainer = []


// END-POINT DE CADASTRO
exports.signUp = async (req, res) => {

    // obtendo logs
    // req.log.info({ body }, 'Dados recebidos na requisição POST')

    try {
        const { email, name, password } = req.body

        const existUser = await User.findOne({ email })

        if (existUser) return res.status(401).json(
            {
                status: "error",
                message: "Email já cadastrado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "Já existe um cadastro com esse email"
                }
            }
        )

        const user = new User({ name, email, password })
        await user.save()

        const token = await jwt.sign({ id: user._id, email: user.email }, secretToken, { expiresIn: '1h' })

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Apenas true em produção
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        }).status(200)
            .json({
                status: "success",
                message: "Cadastro realizado com sucesso",
                statusCode: res.statusCode,
                ok: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role || '',
                    avatarUrl: user.avatarUrl || '',
                    createdAt: user.createdAt,
                    lastLoginAt: Date.now()
                }
            })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}



// END-POINT DE LOGIN
exports.login = async (req, res) => {

    // req.log.info(req.body.email, 'Dados de Login recebidos via POST')

    try {
        const { email, password } = req.body

        // Verificar se usuário existe
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuário não encontrado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "Usuário não encontrado, verifique os dados inseridos ou cadastre-se"
                }
            })
        }

        // Verificar se senha é a senha hasheada
        const isPasswordValid = await argon2.verify(user.password, password)
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Credenciais inválidas. Verifique o e-mail e a senha e tente novamente.",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "Credenciais inválidas"
                }
            }
            )
        }

        // atribuindo tokens e salvando no 
        // array tokens base de dados
        const acessToken = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' })
        const refreshToken = await jwt.sign({ id: user._id, email: user.email }, secretToken, { expiresIn: '7d' })

        refreshTokenContainer.push(refreshToken)

        if (refreshTokenContainer.length >= 4) {
            refreshTokenContainer.shift()
        }

        try {
            user.refreshTokens = [...refreshTokenContainer]
            await user.save()
            // console.log('salvo')

        } catch (error) {
            console.log(error)
        }


        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Apenas true em produção
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        }).status(200).json({
            status: 'success',
            message: 'Login realizado com sucesso',
            statusCode: res.statusCode,
            ok: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || '',
                avatarUrl: user.avatarUrl || '',
                createdAt: user.createdAt,
                lastLogin: new Date()
            },
            access_token: acessToken,
        })

    } catch (error) {
        res.status(404).json(
            {
                status: "error",
                message: "Error ao fazer login, tente novamente mais tarde",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unknown",
                    details: "Erro desconhecido"
                }
            }
        )
    }
}


// END-POINT DE SIGNOUT
exports.signout = async (req, res) => {

    try {
        const tokenSentByCookie = req.cookies.refresh_token
        const tokenSentByHeader = req.headers.authorization?.replace('Bearer ', '')

        const refresh = tokenSentByCookie || tokenSentByHeader
        if (!refresh) {
            return res.status(400).json({ error: 'Refresh token não fornecido' });
        }

        const userInfoDecoded = jwt.verify(refresh, process.env.JWT_TOKEN)


        const userData = await User.findById(userInfoDecoded.id)
        if (!userData) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        userData.refreshTokens = [...userData.refreshTokens].filter(token => token !== refresh)


        await userData.save()

        // console.log(userData.refreshTokens, refreshTokenContainer)

        res.clearCookie('refresh_token', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })


        return res.status(200).json({ message: 'Logout realizado com sucesso!' });

    } catch (error) {
        res.json({ error: error.message })
        console.log(error)
    }
}


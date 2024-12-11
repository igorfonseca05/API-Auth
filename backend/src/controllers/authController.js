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
            secure: true,
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
                },
                session: {
                    ipAddress: req.ip,
                    device: req.header['user-agent'],
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

        try {
            user.refreshTokens = [...refreshTokenContainer]
            await user.save()
            // console.log('salvo')

        } catch (error) {
            console.log(error)
        }


        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
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


// exports.refresh = async (req, res) => {
//     try {

//         const refresh = req.cookie.refresh_token || req.headers.authorization?.replace('Bearer ', '')

//     } catch (error) {

//     }
// }


// END-POINT DE SIGNOUT
exports.signout = (req, res) => {

    try {

        res.clearCookie('auth_token', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })

        res.status(200).json({
            status: 'success',
            message: 'Logout realizado com sucesso',
            statusCode: res.statusCode,
            ok: true,
        }
        )

    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Erro ao fazer logout. Tente novamente mais tarde.',
            statusCode: res.statusCode,
            ok: false,
        }
        )
    }
}


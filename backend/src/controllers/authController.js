const User = require('../models/userModel')
// const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const bcrypt = require('bcrypt')


let refreshTokenContainer = []
const MAX_REFRESH_TOKENS = 4


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

        const accessToken = await jwt.sign({ id: user._id, name: user.name }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15min' })
        const refreshToken = await jwt.sign({ id: user._id, name: user.name }, process.env.JWT_TOKEN, { expiresIn: '7d' })

        // Adicionando refresh ao refreshContainer
        refreshTokenContainer.push(refreshToken)

        // Adicionando token ao usuário na base de dados
        user.refreshTokens = [...refreshTokenContainer]

        try {

            await user.save()

        } catch (error) {
            return res.status(404).json({
                status: "error",
                message: "Erro ao salvar usuário na base de dados",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: error.name,
                    details: error.message
                }
            })
        }

        res.cookie('refresh_token', refreshToken, {
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
                    lastLoginAt: Date.now(),
                    accessToken
                }
            })

    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Erro ao cadastrar usuário",
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "Unauthorized",
                details: error.message
            }
        })
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
                    type: "User not found",
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
                    type: "Invalid credentials",
                    details: "Credenciais inválidas"
                }
            }
            )
        }

        // atribuindo tokens e salvando no array tokens base de dados
        const acessToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1m' })
        const refreshToken = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_TOKEN, { expiresIn: '7d' })

        // Adicionando token ao array de tokens
        refreshTokenContainer.push(refreshToken)

        // Controlando quantidade de tokens do usuário
        if (refreshTokenContainer.length >= MAX_REFRESH_TOKENS) {
            refreshTokenContainer.shift()
        }

        // Salvando os tokens aos dados do usuário na base de dados
        try {
            user.refreshTokens = [...refreshTokenContainer]
            await user.save()
        } catch (error) {
            console.log(error)
        }


        // Respondendo ao Usuário
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
                lastLoginAt: new Date(),
                access_token: acessToken,
            },
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

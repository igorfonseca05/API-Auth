const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


/** Descrevendo a lógica por trás do processo de criar uma rota de refresh_Token */
/** O primeiro passo aqui foi obter o valor do refresh token verificando se ele foi enviado ou via cookie ou
 * no cabeçalho da requisição.
 * 
 * Obtido o valor, decodificamos os dados do usuário anexado ao refresh token para buscar
 * os dados associados na base de dados para verificar se no array de tokens do usuário contém o
 * refresh token enviado.
 * Caso o refresh token esteja de fato associado ao usuário, então permitimos a esse usuário poder criar um 
 * novo access token usando o jwt.sign e usando o nome desse usuário como payload, usando o accessToken secreto e 
 * atribuindo um tempo de expiração para o novo accessToken. Após isso respondemos nosso usuário com o nosso
 * accessToken no corpo da requisição.
 */

let userData

exports.refreshToken = async (req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken || req.headers.authorization?.replace('Bearer ', '')
        const decoded = jwt.verify(refreshToken, process.env.JWT_TOKEN)

        // console.log(decoded)

        const user = await User.findById(decoded.id)

        if (!user) return res.status(403).json({ error: 'Usuário não encontrado' })

        if (!refreshToken || !user.refreshTokens.includes(refreshToken)) {
            return res.status(403).json({ error: 'Refresh Token inválido!' })
        }


        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(403).json({ error: 'refresh token inválido!' })

            const newAcessToken = jwt.sign({ username: user.name }, process.env.ACESS_TOKEN, { expiresIn: '15min' })

            res.status(200).json({ accessToken: newAcessToken })
        })

    } catch (error) {
        res.status(404).json({ error: 'Erro ao validar refresh token' })
    }
}

exports.signout = async (req, res) => {
    const refresh = req.cookies.refresh_token || req.headers.authorization?.replace('Bearer ', '')

    try {

        console.log(userData)

        // userData.refreshTokens = [...userData.refreshTokens].filter(token => token !== refresh)
        // await user.save()

        // res.clearCookie('refresh_token', {
        //     path: '/',
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict'
        // })

        // console.log("saiu")

    } catch (error) {
        console.log(error.message)
    }
}
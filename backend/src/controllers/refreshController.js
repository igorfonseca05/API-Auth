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

    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN
    const refreshTokenSecret = process.env.JWT_TOKEN

    try {
        const refreshTokenSentByCookie = req.cookies.refresh_token
        const refreshTokenSentByHeader = req.headers.authorization?.replace('Bearer ', '')
        const refreshToken = refreshTokenSentByCookie || refreshTokenSentByHeader

        if (!refreshToken) {
            return res.status(403).json({
                status: "error",
                message: "Refresh token não enviado",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "Refresh Token não enviado no corpo da requisição"
                }
            })
        }

        // Decodificando token e buscando usuário
        const userTokenDecoded = jwt.verify(refreshToken, refreshTokenSecret)
        const userId = userTokenDecoded.id
        const userData = await User.findById(userId)

        if (!userData) return res.status(403).json({
            status: "error",
            message: "Usuário não encontrado",
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "Unauthorized",
                details: "O refresh token enviado não pertence a nenhum usuário cadastrado!"
            }
        })

        // Verificando se o token foi enviado ou se pertence ao usuário
        const userHasRefreshToken = userData.refreshTokens.includes(refreshToken)
        if (!userHasRefreshToken || !userTokenDecoded) {
            return res.status(403).json({
                status: "error",
                message: "Refresh token inválido",
                statusCode: res.statusCode,
                ok: false,
                error: {
                    type: "Unauthorized",
                    details: "O refresh token enviado não coincide com os cadastrado com o usuário!"
                }
            })
        }

        const payloadUser = { id: userData._id, name: userData.name }
        const newAcessToken = jwt.sign(payloadUser, accessTokenSecret, { expiresIn: '1m' })

        res.status(200).json({
            status: 'success',
            message: 'Access token gerado com sucesso',
            statusCode: res.statusCode,
            ok: true,
            user: {
                ...userData,
                access_token: newAcessToken,
            },
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Error ao gerar novo access token",
            statusCode: res.statusCode,
            ok: false,
            error: {
                type: "Unauthorized",
                details: error.message
            }
        })
    }
}

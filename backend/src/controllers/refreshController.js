const jwt = require('jsonwebtoken')


exports.refreshToken = (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken || req.headers.authorization?.replace('Bearer ', '')

        if (!refreshToken || !refreshTokenContainer.include(refreshToken)) {
            return res.status(403).json({ error: 'Refresh Token inválido!' })
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(403).json({ error: 'refresh token inválido!' })

            const newAcessToken = jwt.sign({ username: user.name }, process.env.ACESS_TOKEN, { expiresIn: '15min' })

            res.status(200).json({ accessToken: newAcessToken })
        })


    } catch (error) {

    }

}
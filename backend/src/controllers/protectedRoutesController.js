
const User = require('../models/userModel')


exports.updateUserData = async (req, res) => {

    try {
        const { id, name, email, lastName, DateOfBith, gender } = req.body


        const existUser = await User.findByIdAndUpdate(
            id,
            { name, email, lastName, DateOfBith, gender },
            { new: true, runValidators: true }
        )

        if (!existUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        const { _doc: user } = { ...existUser }
        delete user.password
        delete user.refreshTokens

        console.log(user, existUser)

        res.status(200).json({
            status: 'success',
            message: 'Dados atualizados com sucesso',
            statusCode: res.statusCode,
            ok: true,
            // user: {
            //     id: user._id,
            //     name: user.name,
            //     email: user.email,
            //     role: user.role || '',
            //     avatarUrl: user.avatarUrl || '',
            //     createdAt: user.createdAt,
            //     lastLogin: new Date(),
            //     lastUpdate: new Date(),
            //     access_token: acessToken,
            // },
        })

    } catch (error) {

    }
}

const User = require('../models/userModel')

exports.deleteUser = async (req, res) => {
    try {

        const { email } = req.body

        const userIndex = await User.findOne({ email })

        // console.log(userIndex)


    } catch (error) {

    }
}
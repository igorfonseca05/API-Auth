const express = require('express')
const routes = express.Router()

// Controllers
const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const deleteController = require('../controllers/deleteController')
const protectedRoutesController = require('../controllers/protectedRoutesController')
const verifyTokenController = require('../controllers/verifyTokenController')
const refreshController = require('../controllers/refreshController')
const signOutController = require('../controllers/signOutController')

// Middlewares
const validation = require('../middlewares/authValidator')
const loginValidator = require('../middlewares/authLoginValidator')
const verifyToken = require('../middlewares/verifyToken')
// const getLocation = require('../middlewares/geoLocation')


// Rotas da pagina home
routes.get('/', homeController.home)

// Rotas para sistema de cadastro e login
routes.post('/signup', validation, authController.signUp)
routes.post('/login', loginValidator, authController.login)
routes.post('/signout', signOutController.signout)
routes.post('/refresh-token', refreshController.refreshToken)
routes.post('/verifyToken', verifyTokenController.accessToken)
// routes.post('/validate-token', verifyToken, verifyTokenController.verifyUserToken)
routes.delete('/delete', verifyToken, deleteController.deleteUser)
routes.put('/updateUserData', verifyToken, protectedRoutesController.updateUserData)


routes.use((req, res) => {
    res.status(404).json({ error: "Rota inexistente" })
})

module.exports = routes
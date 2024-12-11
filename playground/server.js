const express = require('express')
const mongoose = require('mongoose')

const app = express()

const userData = require('./src/models/dataModel')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/user')
    .then(() => {
        // console.log('conectou')
        app.emit('conectou')
    })
    .catch((error) => {
        console.log('erro')
    })


app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor' })

})

app.post('/form', async (req, res) => {
    try {

        const { name, email } = req.body

        const user = await userData.findOne({ email })

        if (user) return res.status(401).json({ message: 'Nome já adicionado' })

        const newUser = new userData({ name, email })

        await newUser.save()
        console.log('Usuário adicionado')

    } catch (error) {
        console.log(error)
    }

})


app.on('conectou', () => {
    app.listen(3000, () => {
        console.log('servidor On')
        console.log('http://localhost:3000')
    })
})
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const argon2 = require('argon2')


const app = express()

const userData = require('./src/models/dataModel')
const publicPath = path.join(__dirname, '../public')
const root = { root: path.join(__dirname, 'public') }

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicPath))

mongoose.connect('mongodb://localhost:27017/user')
    .then(() => {
        // console.log('conectou')
        app.emit('conectou')
    })
    .catch((error) => {
        console.log('erro')
    })


async function hash() {
    const senha = 'fonseca05'

    const passwordHash = await argon2.hash(senha)

    console.log(await argon2.verify(passwordHash, senha))
}

hash()



app.get('/', async (req, res) => {

    res.status(200).sendFile('home.html', { root: path.join(__dirname, 'public') })

})

app.get('/help', (req, res) => {
    res.sendFile('ajuda.html', root)
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

app.post('/formUpdate', async (req, res) => {

    try {

        const { emailAtual, novoEmail } = req.body

        const user = await userData.findOneAndUpdate({ email: emailAtual },
            { email: novoEmail },
            { new: true, runValidators: true }
        )

        if (user) return res.status(401).json({ message: 'Nome já adicionado' })

        console.log('Dados atualizados com sucesso')

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
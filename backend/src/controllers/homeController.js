
exports.home = (req, res) => {
    res.status(200).json({ message: 'Bem vindo ao servidor, você está na pagina Home' })
}
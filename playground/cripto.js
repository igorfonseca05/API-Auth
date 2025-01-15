
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')



/**No código abaixo estou usando o crypto para criar um par de chaves publica e privada
 * para estudar como funciona a criptografia assimétrica que usa a chave pública para
 * escrever 
 */
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem'
//     },
//     privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem'
//     }
// })



// console.log(privateKey, publicKey)


// Vamos aprender a cifrar aquivos no nodeJs


// Criamos uma chave e um vetor de inicialização
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

// console.log(key, iv)

function salvar(tag) {

    const senhas = { key, iv, tag }

    const json = fs.writeFileSync('senhas.json', JSON.stringify(senhas))

}


function cifrar() {

    // Cria os arquivos que serão cifrados
    if (!fs.existsSync(path.join(__dirname, 'cifra.txt'))) {
        fs.writeFileSync('cifra.txt', 'Oi eu sou o igor')
    }

    if (!path.join(__dirname, 'cifraOut.txt')) {
        fs.writeFileSync('cifraOut.txt', 'arquivo de saída')
    }

    // Instaciamos o cifrador com informações de como queremos que seja feita
    // a cifragem de nosso arquivos
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)


    /**Aqui estamos usando os métodos de CreateReadStream e CreateWriteStream para criar um fluxo 
     * de leitura ou escrita de arquivo, sem que o node precise carregar
     * o arquivo todo de uma vez na memória, ao invés disso, ele lê e escreve
     * dados do arquivo em blocos. 
     */
    const inputFile = fs.createReadStream(path.join(__dirname, 'cifra.txt'))
    const outputFile = fs.createWriteStream(path.join(__dirname, 'cifraOut.txt'))

    /** Aqui criamos um fluxo de leitura e escrita no processo de cifragem
     * para garantir que os dados sejam cifrados enquanto são lidos e gravados 
     * na saída do processo
     */
    inputFile.pipe(cipher).pipe(outputFile)

    /** Ao final do processo de cifragem lançamos um evento indicando que o 
     * processo de cifragem terminou
     */
    outputFile.on('finish', () => {
        console.log('Arquivo cifrado com sucesso!')
        const getTag = cipher.getAuthTag()
        salvar(getTag)
    })
}


function decifrar() {

    const senhas = fs.readFileSync('senhas.json')

    const { key, iv, tag } = JSON.parse(senhas)

    // console.log(Buffer.from(key), Buffer.from(iv))
    // 
    // // Cria os arquivos que serão cifrados
    // if (!path.join(__dirname, 'cifra.txt')) {
    //     fs.writeFileSync('cifra.txt', 'Oi eu sou o igor')
    // }

    // if (!path.join(__dirname, 'cifraOut.txt')) {
    //     fs.writeFileSync('cifraOut.txt', 'arquivo de saída')
    // }

    // Criamos uma chave e um vetor de inicialização


    // Instaciamos o cifrador com informações de como queremos que seja feita
    // a cifragem de nosso arquivos
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
    decipher.setAuthTag(Buffer.from(tag, 'hex'))

    /**Aqui estamos usando os métodos de CreateReadStream e CreateWriteStream para criar um fluxo 
     * de leitura ou escrita de arquivo, sem que o node precise carregar
     * o arquivo todo de uma vez na memória, ao invés disso, ele lê e escreve
     * dados do arquivo em blocos. 
     */
    const inputFile = fs.createReadStream(path.join(__dirname, 'cifra.txt'))
    const outputFile = fs.createWriteStream(path.join(__dirname, 'cifraOut.txt'))

    /** Aqui criamos um fluxo de leitura e escrita no processo de cifragem
     * para garantir que os dados sejam cifrados enquanto são lidos e gravados 
     * na saída do processo
     */
    inputFile.pipe(decipher).pipe(outputFile)

    /** Ao final do processo de cifragem lançamos um evento indicando que o 
     * processo de cifragem terminou
     */
    outputFile.on('finish', () => console.log('Arquivo decifrado com sucesso!'))
}

// cifrar()

decifrar()


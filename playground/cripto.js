
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// CRIPTOGRAFIA SIMÉTRICA

// Gerando chave simétrica
const simetrica = crypto.generateKeySync('aes', { length: 256 })



// CRIPTOGRAFIA ASSIMÉTRICA

/**No código abaixo estou usando o crypto para criar um par de chaves publica e privada
 * para estudar como funciona a criptografia assimétrica que usa a chave pública para
 * escrever
 */
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
})

console.log(publicKey, simetrica.export().toString('hex'))













// Vamos aprender a cifrar aquivos no nodeJs


// // Criamos uma chave e um vetor de inicialização
// const key = crypto.randomBytes(32)
// const iv = crypto.randomBytes(16)

// // console.log(key, iv)



// function cifrar() {

//     // Cria os arquivos que serão cifrados
//     if (!fs.existsSync(path.join(__dirname, 'cifra.txt'))) {
//         fs.writeFileSync('cifra.txt', 'Oi eu sou o igor')
//     }

//     if (!path.join(__dirname, 'cifraOut.txt')) {
//         fs.writeFileSync('cifraOut.txt', 'arquivo de saída')
//     }

//     // Instaciamos o cifrador com informações de como queremos que seja feita
//     // a cifragem de nosso arquivos
//     const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)


//     /**Aqui estamos usando os métodos de CreateReadStream e CreateWriteStream para criar um fluxo
//      * de leitura ou escrita de arquivo, sem que o node precise carregar
//      * o arquivo todo de uma vez na memória, ao invés disso, ele lê e escreve
//      * dados do arquivo em blocos.
//      */
//     const inputFile = fs.createReadStream(path.join(__dirname, 'cifra.txt'))
//     const outputFile = fs.createWriteStream(path.join(__dirname, 'cifraOut.txt'))

//     /** Aqui criamos um fluxo de leitura e escrita no processo de cifragem
//      * para garantir que os dados sejam cifrados enquanto são lidos e gravados
//      * na saída do processo
//      */
//     inputFile.pipe(cipher).pipe(outputFile)

//     /** Ao final do processo de cifragem lançamos um evento indicando que o
//      * processo de cifragem terminou
//      */
//     outputFile.on('finish', () => {
//         // const getTag = cipher.getAuthTag()

//         fs.writeFileSync('senhas.json', JSON.stringify({ key: key.toString('hex'), iv: iv.toString('hex') }))
//         console.log('Arquivo cifrado e senhas salvas com sucesso!')

//     })
// }


// function decifrar() {
//     // Lê as senhas do arquivo JSON
//     const senhas = fs.readFileSync('senhas.json', 'utf-8');
//     const { key, iv } = JSON.parse(senhas);

//     // Instancia o decifrador
//     const decipher = crypto.createDecipheriv(
//         'aes-256-cbc',
//         Buffer.from(key, 'hex'),
//         Buffer.from(iv, 'hex')
//     );

//     // Cria streams de leitura e escrita
//     const inputFile = fs.createReadStream(path.join(__dirname, 'cifraOut.txt')); // O arquivo cifrado
//     const outputFile = fs.createWriteStream(path.join(__dirname, 'decifra.txt')); // O arquivo decifrado

//     // Conecta o fluxo para decifragem
//     inputFile.pipe(decipher).pipe(outputFile);

//     // Após terminar a decifragem, confirma no console
//     outputFile.on('finish', () => console.log('Arquivo decifrado com sucesso!'));
// }

// // cifrar()
// decifrar()



const crypto = require('crypto')



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



console.log(privateKey, publicKey)

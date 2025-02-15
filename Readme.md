![Group 18](https://github.com/user-attachments/assets/9b79622d-c9d4-4029-a999-d9c6603b0a25)

- [Introdução](#introducao)
- [Casa](#casa)

# Introdução

API-authentication é um projeto desenvolvido em função da necessidade de se aplicar conhecimentos adquiridos em estudos
da linguagem **javascript** no lado do servidor em projetos reais. Criado com diversos pacotes publicos disponiveis no NPM, esse projeto dispoe de diversas funcionalidades como **sign-up**, **login** e entre outras. Essa documentação foi criada no intuito de servir como uma anotação para consultas futuras, de modo que todo o conteúdo apresentado aqui será o mais completo e detalhado possível.

# Passos iniciais

Para iniciar o projeto, no terminal do VS Code dentro do diretório da pasta onde vai criar os arquivo do projeto digite

    npm init

Usamos esse commando para criar um **package.json** na nossa aplicação, que será o responsável por armazenar as dependencias da aplicação. Com o arquivo criado precisamos instalar os pacotes iniciais que vamos utilizar para criar nossa API. No terminal digite

     npm i express mongoose nodemon --save-dev dotenv

Eles serão adicionados ao package.json como dependencias. Na raiz do projeto deve-se criar o arquivo **server.js** que é onde será adicionada toda a lógica por trás do servidor.

### server.js

```javascript
require(".dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env para process.env

const express = require("express"); // Importa o framework Express para criar o servidor

const app = express(); // Cria uma instância do servidor com Express

// server config
const port = process.env.port || 5000; // Define a porta do servidor (process.env.port ou 5000)

app.get("/", (req, res) => {
  res.send("Bem vindo a API"); // Configura a rota principal (/) para responder com "Bem vindo a API"
});

app.listen(port, () => {
  console.log("Servidor on"); // Exibe mensagem indicando que o servidor está ativo
  console.log(`Acesse em http://localhost:${port}`); // Informa a URL para acessar o servidor
});
```

Aqui será utilizado o padrão MVC(Model, viewers, controllers)

    Client Request ---> Server ---> Routes.js ---> Middleware ---> Controller ---> Response

pois podemos trabalhar com separação de responsabilidades:

- **Routes:** Determinam "para onde" a requisição vai com base no endpoint.
- **Middleware:** Adiciona camadas para pré-processamento (como autenticação ou validação).
- **Controller:** Contém a lógica de processamento de requisições.
- **Response:** Contém a resposta da requisições.

Crie um pasta nomeada de **src** (source) na raiz do projeto, dentro dela a pasta **Controller** e **Routes**. Primeiro organizamos as rotas.

    API-Authentication
    |
    |- node_modules 🗃️
    |
    |--src 🗃️
    |   |-Controller 📁
    |   |-routes 📁
    |
    |- package.json 📄
    |- server.js 📄

No arquivo routes vamos cria o arquivo chamado **routes.js** e junto com ele o arquivo **users.js** e o **auth.js**

    API-Authentication
    |
    |- node_modules 🗃️
    |
    |--src 🗃️
    |   |-Controller 📁
    |   |-routes 📁
    |      |- users.js 📄
    |      |- auth.js 📄
    |      |- index.js 📄
    |
    |- package.json 📄
    |- server.js 📄

no **index.js** faremos:

```javascript
1. const express = require('express')  // Ação 1: Importa o módulo 'express' para criar o roteador

2. const router = express.Router()  // Ação 2: Cria um novo roteador usando o express.Router()

3. const users = require('./users')  // Ação 3: Importa o arquivo 'users.js' para lidar com as rotas de usuários

4. const tasks = require('./task')  // Ação 4: Importa o arquivo 'task.js' para lidar com as rotas de tarefas

5. router.use('/users', users)  // Ação 5: Define que as rotas com '/users' serão tratadas pelo controlador 'users'

6. router.use('/tasks', tasks)  // Ação 6: Define que as rotas com '/tasks' serão tratadas pelo controlador 'tasks'

7. module.exports = router  // Ação 7: Exporta o roteador para que ele possa ser usado em outros arquivos

```

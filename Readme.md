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
const express = require("express"); // Importa o módulo 'express' para criar o roteador

const router = express.Router(); // Cria um novo roteador usando o express.Router()

// Controllers das rotas
const users = require("./users"); // Importa o arquivo 'users.js' para lidar com as rotas de usuários
const auth = require("./auth"); // Importa o arquivo 'task.js' para lidar com as rotas de tarefas

// Rotas para endpoint Users
router.use("/users", users); // Define que as rotas com '/users' serão tratadas pelo controlador 'users'
router.use("/auth", auth); // Define que as rotas com '/tasks' serão tratadas pelo controlador 'tasks'

module.exports = router; // Exporta o roteador para que ele possa ser usado em outros arquivos
```

nos arquivos **users** e **auth** que são importados acima, adicionaremos as rotas publicas e privadas do nosso sistema de autenticação, pode ser visto abaixo:

## auth.js :closed_lock_with_key:

```javascript const express = require('express')
const route = express.Router();

// Controllers
const authController = require("../controllers/authController");

// Routes
route.post("/signup", authController.signUp); // Rota para criar uma nova conta (signup)
route.post("/login", authController.signIn); // Rota para fazer login
route.post("/logout", authController.logout); // Rota para fazer logout (remover o token)
route.post("/logoutAll", authController.logoutAll); // Rota para fazer logout de todos os dispositivos

module.exports = route;
```

## users.js :busts_in_silhouette:

```javascript const express = require('express')  // Importa o módulo 'express' para criar o roteador
const route = express.Router(); // Cria um novo roteador usando o express.Router()

// Controllers
const userController = require("../controllers/usersControllers"); // Importa o controlador de usuários, onde as funções de lógica estão.

// Routes
route.get("/profile", userController.getusers); // Rota para obter o perfil de usuário.
route.patch("/profile", userController.patchUser); // Rota para atualizar os dados do usuário.
route.delete("/profile", userController.deleteUser); // Rota para excluir a conta do usuário.

module.exports = route; // Exporta o roteador para que ele possa ser utilizado em outros arquivos
```

A função de processamento de cada uma dessas rotas foram colocadas dentro de seu respectivo **controller**, como podemos ver nas importações

```javascript
const authController = require("../controllers/authController");
const userController = require("../controllers/usersControllers");
```

é dentro desses controllers que iremos condensar todas as rotas que manipularão os dados e responderão os usuário.

Com todas as rotas criadas e configuradas, vamos agora na pasta **controlers** e criar os arquivos **authController.js** e **usersControllers.js**, de modo que a estrutura do nosso projeto até o momento seja:

    API-Authentication
    |
    |- node_modules 🗃️
    |
    |--src 🗃️
    |   |-Controller 📁
    |      |- authController.js 📄
    |      |- usersController.js 📄
    |   |-routes 📁
    |      |- users.js 📄
    |      |- auth.js 📄
    |      |- index.js 📄
    |
    |- package.json 📄
    |- server.js 📄

Dentro desses arquivos faremos:

## authController.js :lock:

```javascript
exports.signUp = async (req, res) => {}; // Controlador responsável por criar um novo usuário

exports.signIn = async (req, res) => {}; // Controlador responsável pelo login do usuário

exports.logout = async (req, res) => {}; // Controlador responsável por realizar o logout do usuário

exports.logoutAll = async (req, res) => {}; // Controlador responsável por realizar o logout de todos os dispositivos
```

## usersController.js :busts_in_silhouette:

```javascript
exports.getusers = async (req, res) => {}; // Rota para obter o perfil do usuário autenticado

exports.deleteUser = async (req, res) => {}; // Rota para excluir a conta do usuário

exports.patchUser = async (req, res) => {}; // Rota para atualizar as informações do usuário

exports.uploads = async (req, res) => {}; // Rota para realizar upload de foto de perfil

exports.deleteAvatar = async (req, res) => {}; // Rota para excluir a foto de perfil do usuário

exports.getAvatar = async (req, res) => {}; // Rota para obter a foto de perfil do usuário
```

Vamos adicionar a lógica necessaria em cada uma das rotas acima de modo decrescente.

# Rotas 📍

A primeira rota que vamos que vamos configurar dentro da nossa API é a rota **signup**, que é a rota responsável por adicionar nossa usuário na base de dados. Mas antes de iniciarmos a configuração da rota precisamos criar o **model** que é, em termos simples, o modelo estrutural que usaremos para estruturar nossos dados na base de dados.  
Dentro da pasta **src** criamos uma terceira pasta chamada _model_ e dentro dela um arquivo que nomearemos como _userModel.js_.

    API-Authentication
    |
    |--node_modules 📁
    |
    |--src 🗃️
    |   |--Controller 📁
    |   |--routes 🛤️
    |   |   |-- index.js 📄
    |   |   |-- users.js 📄
    |   |   |-- auth.js 📄
    |   |
    |   |--model 📂
    |   |   |-- userModel.js 📄
    |
    |--package.json 📄
    |--server.js 📄

Com o model criado, dentro do arquivo faremos:

## userModel.js 📦

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, // O nome de usuário é obrigatório
    trim: true, // Sanitiza o input
  },
  email: {
    type: String,
    required: true, // O e-mail é obrigatório
    unique: true, // O e-mail deve ser único no banco de dados
    trim: true, // Sanitiza o input
  },
  password: {
    type: String,
    required: true, // A senha é obrigatória
    trim: true, // Sanitiza o input
  },
});

// Definindo o modelo de dados "Users" baseado no esquema "userSchema"
const userData = mongoose.model("Users", userSchema);

module.exports = userData;
```

No model acima adicionamos algumas configurações que são importantes no inicio, e algumas outras serão adicionadas a medida que vamos desenvolvendo a aplicação. No model acima um usuário cadastrado na base de dados terá seus dados armazenados como:

```json
{
  "_id": "new ObjectId('213asf5554s5533525')",
  "name": "Caio",
  "email": "caio@gmail.com",
  "password": "123456"
}
```

Antes de falarmos da senha e caracteristicas dos dados quando os salvamos na base de dados, precisamos primeiro ter onde salvar os dados, e sem a conexão com a base isso é impossivel.

## Conectando a base de dados 💾

Na pasta **src** vamos adicinar a pasta _DB_ onde criamos o arquivo _db.js_, que será o responsavel por toda a logica da conexão com a base de dados

    API-Authentication
    │
    ├── src 🗃️
    │   ├── Controller 📁
    │   ├── Model 📂
    │   │   └── userModel.js
    │   ├── Routes 📁
    │   │   ├── auth.js
    │   │   ├── users.js
    │   │   └── index.js
    │   ├── db 🗄️
    │       └── db.js
    ├── package.json 📄
    ├── server.js 📄

### db.js 🗄️

```javascript
const mongoose = require("mongoose");
const Events = require("events");

const dbEvents = new Events();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    dbEvents.emit("connected");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = { dbEvents };
```

para poder acessar o _process.env.DB_URL_, precisamos na raiz no projeto criar um arquivo .env e um .gitignore. O .env é onde adicionamos as variaveis de ambiente, e o .gitignore e onde colocamos a extensão dos arquivos que não queremos que sejam enviados para o github.

    API-Authentication
    │
    ├── src 🗃️
    │   ├── Controller 📁
    │   ├── Model 📂
    │   │   └── userModel.js
    │   ├── Routes 📁
    │   │   ├── auth.js
    │   │   ├── users.js
    │   │   └── index.js
    │   ├── db 🗄️
    │   │   └── db.js
    ├── .env 📄
    ├── .gitignore 📄
    ├── package.json 📄
    ├── server.js 📄

no arquivo .env e .gitignore adicionamos

#### .env

    DB_URL: mongodb://127.0.0.1/27017/auth

que é a string de conexão que o mongoose vai utilizar para conectar com a base de dados. Já no no .gitignore fazemos

#### .gitignore

    node_modules
    .env

Agora esses arquivos não serão mais mapeados para o github e não corremos o risco de expor dados sensiveis da nossa aplicação. Para finalizar a conexão com a base de dados, precisamos importar esse arquivo no arquivo server para que quando o servidor seja iniciado, a conexão seja estabelecida e o evento ` dbEvents.emit("connected")` seja disparado e então o servidor liberado.

# 1°- Atualização servidor

#### server.js (Conexão com a base)

```javascript
require(".dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env para process.env

const express = require("express"); // Importa o framework Express para criar o servidor

const app = express(); // Cria uma instância do servidor com Express

// server config
const port = process.env.port || 5000; // Define a porta do servidor (process.env.port ou 5000)

// DB
const { dbEvents } = require("/src/db/dbConnection");

app.get("/", (req, res) => {
  res.send("Bem vindo a API"); // Configura a rota principal (/) para responder com "Bem vindo a API"
});

dbEvents.on("connected", () => {
  app.listen(port, () => {
    console.log("Servidor on"); // Exibe mensagem indicando que o servidor está ativo
    console.log(`Acesse em http://localhost:${port}`); // Informa a URL para acessar o servidor
  });
});
```

no código

```javascript
// Ouvindo o evento 'connected' do dbEvents, que é disparado quando a conexão com o banco de dados é bem-sucedida
dbEvents.on("connected", () => {
  // Inicia o servidor na porta especificada, e exibe mensagens de sucesso
  app.listen(port, () => {
    console.log("Servidor on"); // Exibe mensagem indicando que o servidor está ativo
    console.log(`Acesse em http://localhost:${port}`); // Informa a URL para acessar o servidor
  });
});
```

indica que o servidor só será liberado após o sinal "connected" ser emitido. Feito a atualização acima, vc deve ser capaz de acessar o servidor já com a base conectada.

# 2°- Atualização servidor

Com a base de dados configurada, já quase podemos iniciar as configurações das nossas rotas, porém nosso servidor ainda não é capaz de interpretar e responder requisições no formato `JSON` e nem de receber objetos complexos no corpo da requisição. Para resolver isso teremos de atualizar nosso arquivo **server.js**.

#### server.js (Conexão com a base | JSON e extended)

```javascript
require(".dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env para process.env
const express = require("express"); // Importa o framework Express para criar o servidor

const app = express(); // Cria uma instância do servidor com Express

// server config
const port = process.env.port || 5000; // Define a porta do servidor (process.env.port ou 5000)

// DB (1° atualização)
const { dbEvents } = require("/src/db/dbConnection");

// midlewares (2° atualização)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bem vindo a API"); // Configura a rota principal (/) para responder com "Bem vindo a API"
});

dbEvents.on("connected", () => {
  app.listen(port, () => {
    console.log("Servidor on"); // Exibe mensagem indicando que o servidor está ativo
    console.log(`Acesse em http://localhost:${port}`); // Informa a URL para acessar o servidor
  });
});
```

Agora podemos adicionar um primeiro usuário a base de dados e responde-lo usando JSON.

# Rota signup

```javascript
const UserModel = require("../model/userModel"); // Importando model

exports.signUp = async (req, res) => {
  const { email, name, password } = req.body; // obtendo dados do formulário

  try {
    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      throw new Error("Usuário já cadastrado");
    }
  } catch {}
};
```

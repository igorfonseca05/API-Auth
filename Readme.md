![Group 18](https://github.com/user-attachments/assets/9b79622d-c9d4-4029-a999-d9c6603b0a25)

# Índice

- [Introdução](#introdução)
- [Configurações iniciais](#configurações-iniciais)
- [Servidor 🖥️](#1---servidor)
  - [server.js](#serverjs)
- [Rotas 🗺️](#2---router)
  - [routes.js 🗺️](#21---routerjs)
  - [auth.js 🔐](#22---authjs)
  - [users.js 👥](#23---usersjs)
- [Controllers 🕹️](#3---controllers)
  - [authController.js 🔒](#31---authcontrollerjs)
  - [usersController 👥](#32---userscontrollerjs)
- [Base de dados 🗄️](#4---base-de-dados)
  - [Model](#41---model)
    - [userModel.js 📦](#411---usermodeljs)
  - [Conectando a base de dados 💾](#42---conectando-a-base-de-dados)
    - [db.js 🗄️](#421---dbjs)
    - [1° atualização do servidor 🔄](#422---atualização-do-arquivo-serverjss)
    - [2° atualização do servidor 🔄](#423---atualização-do-arquivo-serverjs)
- [Middlewares](#middlewares)
  - [Middleware Validator](#middleware-validator)
    - [userValidator.js](#uservalidatorjs)
- [Rotas 📍](#3--rotas)
  - [signup](#signup)
    - [Hash da senha](#hash)

# Introdução

[Voltar ao topo 🔝](#índice)

API-authentication é um projeto desenvolvido em função da necessidade de se aplicar conhecimentos adquiridos em estudos
da linguagem **javascript** no lado do servidor em projetos reais. Criado com diversos pacotes publicos disponiveis no NPM, esse projeto dispoe de diversas funcionalidades como **sign-up**, **login** e entre outras. Essa documentação foi criada no intuito de servir como uma anotação para consultas futuras, de modo que todo o conteúdo apresentado aqui será o mais completo e detalhado possível.

# Configurações iniciais

[Voltar ao topo 🔝](#índice)

Neste projeto usaremos o modelo MVC(Model, viewers, controllers), onde a requisição chega ao servidor, é direcionada
ao routes que analisa qual endpoint buscar (auth/users), direcionando a solicitação ao Middleware que vai fazer algum
tipo de tratamento nos dados e chegar ao controller que é onde será respondida a solicitação. Esse fluxo pode ser visto
no diagrama abaixo

    Client Request ---> Server ---> Routes.js ---> Middleware ---> Controller ---> Response

pois podemos trabalhar com separação de responsabilidades:

- **Routes:** Determinam "para onde" a requisição vai com base no endpoint.
- **Middleware:** Adiciona camadas para pré-processamento (como autenticação ou validação).
- **Controller:** Contém a lógica de processamento de requisições.
- **Response:** Contém a resposta da requisições.

Vamos iniciar a configuração do nosso projeto com base no fluxo mostrado acima, ou seja, vamos criar os arquivos server
Router e os demais de modo que as requisições fluem até o controller e então criaremos toda a lógica da resposta.

## 1 - Servidor

[Voltar ao topo 🔝](#índice)

Para iniciar o projeto, no terminal do VS Code dentro do diretório da pasta onde vai criar os arquivo do projeto digite

    npm init

Usamos esse commando para criar um **package.json** na nossa aplicação, que será o responsável por armazenar as dependencias da aplicação. Com o arquivo criado precisamos instalar os pacotes iniciais que vamos utilizar para criar nossa API. No terminal digite

     npm i express mongoose nodemon --save-dev dotenv

Eles serão adicionados ao package.json como dependencias. Na raiz do projeto deve-se criar o arquivo **server.js** que é onde será adicionada toda a lógica por trás do servidor.

### server.js

[Voltar ao topo 🔝](#índice)

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

## 2 - Router

[Voltar ao topo 🔝](#índice)

Aqui vamos configurar para onde nosso servidor vai redirecionar as requisições e quais rotas o usuário vai poder acessar. Para isso crie um pasta nomeada de **src** (source) na raiz do projeto, dentro dela a pasta **Routes**, que terá os arquivos **routes.js**, **users.js** e **auth.js** como mostrado abaixo:

    API-Authentication
    |
    |- node_modules 🗃️
    |
    |--src 🗃️
    |   |-routes 📁
    |      |- users.js 📄
    |      |- auth.js 📄
    |      |- routes.js 📄
    |
    |- package.json 📄
    |- server.js 📄

no arquivo **routes.js** faremos:

### 2.1 - router.js

[Voltar ao topo 🔝](#índice)

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

### 2.2 - auth.js

[Voltar ao topo 🔝](#índice)

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

### 2.3 - users.js

[Voltar ao topo 🔝](#índice)

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

# 3 - Controllers

[Voltar ao topo 🔝](#índice)

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

### 3.1 - authController.js

[Voltar ao topo 🔝](#índice)

```javascript
exports.signUp = async (req, res) => {}; // Controlador responsável por criar um novo usuário

exports.signIn = async (req, res) => {}; // Controlador responsável pelo login do usuário

exports.logout = async (req, res) => {}; // Controlador responsável por realizar o logout do usuário

exports.logoutAll = async (req, res) => {}; // Controlador responsável por realizar o logout de todos os dispositivos
```

### 3.2 - usersController.js

[Voltar ao topo 🔝](#índice)

```javascript
exports.getusers = async (req, res) => {}; // Rota para obter o perfil do usuário autenticado

exports.deleteUser = async (req, res) => {}; // Rota para excluir a conta do usuário

exports.patchUser = async (req, res) => {}; // Rota para atualizar as informações do usuário

exports.uploads = async (req, res) => {}; // Rota para realizar upload de foto de perfil

exports.deleteAvatar = async (req, res) => {}; // Rota para excluir a foto de perfil do usuário

exports.getAvatar = async (req, res) => {}; // Rota para obter a foto de perfil do usuário
```

Vamos adicionar a lógica necessaria em cada uma das rotas acima de modo decrescente.

# 4 - Base de dados

[Voltar ao topo 🔝](#índice)

Como vamos iniciar nossa API pela rota de signup, precisamos estabelecer a conexão com a base de dados, uma vez que
na rota em questão precisamos salvar as credenciais do usuário e isso só é possivel se tivermos onde salvar os dados.

## 4.1 - Model

[Voltar ao topo 🔝](#índice)

Um **model** em uma aplicação representa a estrutura e as regras de um dado armazenado no banco de dados. Ele define os campos, tipos de dados e validações necessários para criar e manipular esses dados. Além disso, o model permite interagir com o banco de dados, como realizar consultas, atualizações, exclusões e adições. É usado para centralizar a lógica de negócios relacionada às informações. Em geral, o model é uma peça do padrão **MVC** (Model-View-Controller).

Dentro da pasta **src** criamos uma terceira pasta chamada **model** e dentro dela um arquivo que nomearemos como _userModel.js_.

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

Dentro de **userModel.js** faremos

### 4.1.1 - userModel.js

[Voltar ao topo 🔝](#índice)

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

## 4.2 - Conectando a base de dados

[Voltar ao topo 🔝](#índice)

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

### 4.2.1 - db.js

[Voltar ao topo 🔝](#índice)

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

### 4.2.2 - Atualização do arquivo server.js

[Voltar ao topo 🔝](#índice)

:warning: A parte de texto comentada é que a que foi adicionada ao código.

**server.js (Conexão com a base)**

```javascript
require(".dotenv").config();

const express = require("express");

const app = express();

const port = process.env.port || 5000;

// Conexão com a base de dados (1° atualizações)
const { dbEvents } = require("/src/db/dbConnection");

app.get("/", (req, res) => {
  res.send("Bem vindo a API");
});

dbEvents.on("connected", () => {
  app.listen(port, () => {
    console.log("Servidor on");
    console.log(`Acesse em http://localhost:${port}`);
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

### 4.2.3 - Atualização do arquivo server.js

[Voltar ao topo 🔝](#índice)

Com a base de dados configurada, já quase podemos iniciar as configurações das nossas rotas, porém nosso servidor ainda não é capaz de interpretar e responder requisições no formato `JSON` e nem de receber objetos complexos no corpo da requisição. Para resolver isso teremos de atualizar nosso arquivo **server.js**.

#### server.js (Conexão com a base | JSON e extended)

```javascript
require(".dotenv").config();
const express = require("express");

const app = express();

const port = process.env.port || 5000;

const { dbEvents } = require("/src/db/dbConnection");

// Middlewares (2° atualização)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bem vindo a API");
});

dbEvents.on("connected", () => {
  app.listen(port, () => {
    console.log("Servidor on");
    console.log(`Acesse em http://localhost:${port}`);
  });
});
```

Agora podemos adicionar um primeiro usuário a base de dados e responde-lo usando JSON.

# Middlewares

[Voltar ao topo 🔝](#índice)

Um outro conceito que é muito importante para aprendermos antes de colocarmos a mão na massa, é o de middleware.  
Um middleware é uma função que intercepta requisições (request) e respostas (response) no fluxo de uma aplicação, executando lógica antes de alcançar o manipulador final da rota. Ele pode ser usado para tarefas como autenticação, logging, manipulação de dados ou tratamento de erros. Middleware é aplicado globalmente ou em rotas específicas e funciona em uma sequência definida. No Express, usa-se app.use() ou diretamente na rota.

No nosso projeto teremos dois middlewares principais, o que será responsável por validar os dados enviados no corpo da
requisição e um de verificação de token. Na pasta **src** crie:

    📁 API-Authentication
    ├── 📁 node_modules 🗃️
    │
    ├── 📁 src 🗃️
    │   ├── 📁 controllers 📁
    │   │   ├── authController.js 📄
    │   │   ├── usersController.js 📄
    │   │
    │   ├── 📁 db 📁
    │   │   └── db.js 📄
    │   │
    │   ├── 📁 middleware 📁
    │   │   ├── userValidator.js 📄
    │   │   └── verifyToken.js 📄
    │   │
    │   ├── 📁 model 📁
    │   │   └── userModel.js 📄
    │   │
    │   ├── 📁 routes 📁
    │   │   ├── users.js 📄
    │   │   ├── auth.js 📄
    │   │   └── index.js 📄
    │
    ├── .env 📄
    ├── .gitignore 📄
    ├── package.json 📄
    ├── server.js 📄

## Middleware Validator

[Voltar ao topo 🔝](#índice)

Esse middleware será responsavel por validar os dados enviados no corpo da requisição. Para podermos escrever a lógica associada, vamos instalar o Validator. No terminal do VSCode digite

    npm i validator

uma vez instalado, no arquivo `userValidator.js` faremos

### userValidator.js

[Voltar ao topo 🔝](#índice)

```javascript

const validator = require('validator')

function validate(req, res, next) {

  const {name. email, password} = req.body

  if(!name || name.length <= 2) {
    return res.status(400).json({message: 'O nome deve conter no minimo 3 caracteres'})
  }

  if(!email || validor.isEmail(email)) {
    return res.status(400).json({message: 'Formato de email inválido'})
  }

  if(!password || validator.isLength(password, {min: 6})) {
    return res.status(400).json({message: 'Senha deve conter no minimo 6 caracteres'})
  }

  next()

}

module.exports = validate
```

O middleware acima será adicionado no meio da rota de [signup](#authjs), como podemos ver abaixo:

**routes.js**:

```javascript
const route = express.Router();

const authController = require("../controllers/authController");

const validator = require("../middlewares/userValidator");

// Middleware Validator
route.post("/signup", validator, authController.signUp);

route.post("/login", authController.signIn);
route.post("/logout", authController.logout);
route.post("/logoutAll", authController.logoutAll);

module.exports = route;
```

com os dados sendo validados. Vamos iniciar a implementação das nossas rotas.

<!-- ## Middleware Verificar token

Quando o assunto é autenticação, precisamos de alguma forma garantir que a pessoa que vai acessar as paginas privadas na nossa aplicação, seja quem ela diz ser. Para isso implementamos a rota no qual o usuário faz o signup e o login e nesse processo garantimos que ele receba um código que contem informações sobre o usuário e o enviamos quando respondermos a requisição do usuário.  -->

# 3- Rotas

[Voltar ao topo 🔝](#índice)

Com as primeiras configurações feitas, podemos iniciar a lógica dentro dos controllers [Controllers](#controllers). Destaco que o codigo mostrads abaixo são basicos e que a medida em que formos adicionando novas funcionalidades, serão inclusas novas linhas de código.

# signup

[Voltar ao topo 🔝](#índice)

```javascript
const UserModel = require("../model/userModel"); // Importando model

exports.signUp = async (req, res) => {
  const { email, name, password } = req.body; // obtendo dados do formulário

  try {
    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      throw new Error("Usuário já cadastrado");
    }

    const newUser = new UserModel({ name, email, password });

    try {
      await newUser.save();
      res.status(201).json({
        message: "Usuário criado com sucesso",
        newUser,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
```

Ao escrever o código acima e simular uma requisição, veremos os dados salvos na base de dados, algo parecido com o mostrado abaixo:

```json
{
  "_id": "new ObjectId('213asf5554s5533525')",
  "name": "Caio",
  "email": "caio@gmail.com",
  "password": "123456"
}
```

Porém a senha não pode ser salva em **texto plano** na base de dados, uma vez que se alguém invadir sua base de dados, terá acesso aos dados do usuário. Para resolver isso, teremos de fazer o **hash** da senha.

### Hash

[Voltar ao topo 🔝](#índice)

O hash é um processo de transformar uma senha em uma sequência única e fixa de caracteres, usando um algoritmo como bcrypt ou argon2. Ele é irreversível, ou seja, não é possível converter o hash de volta para a senha original. Quando o usuário tenta fazer login, a senha fornecida é novamente transformada em hash e comparada com o hash armazenado. Isso garante que a senha original nunca seja salva no banco de dados, aumentando a segurança. Além disso, técnicas como "salting" (adicionar valores aleatórios) tornam os hashes únicos, mesmo para senhas iguais. Um hash pode ser visto abaixo.

    $2b$12$IHoTahYqFX3wPKLtvi.6/uM1xpIdcfZBYVgmvY2sMCepqY61aUkXe

Para proteger a senha dos usuários vamos precisar instalar argon2

    npm i argon2

dentro do [userModel.js](#usermodeljs-📦)

```javascript

const mongoose = require("mongoose");
const argon2 = require('argon2')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// Fazendo hash da senha (1° atualização)
userSchema.pre("save", (next) => {
  const user = this;

  try {

    if (!user.isModified(password)) return next();

    user.passoword = await argon2.sign(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      paralelism: 1,
    })

    next()

  } catch(error) {
    next(error)
  }
});

const userData = mongoose.model("Users", userSchema);

module.exports = userData;
```

Agora o que será salvo na base de dados é o hash da senha, e não a senha como texto plano. Limpe a base de dados e cadatre um novo usuário, o resultado deve ser algo como

```json
{
  "_id": "new ObjectId('213asf5554s5533525')",
  "name": "Caio",
  "email": "caio@gmail.com",
  "password": "$2b$12$IHoTahYqFX3wPKLtvi.6/uM1xpIdcfZBYVgmvY2sMCepqY61aUkXe"
}
```

# login

[Voltar ao topo 🔝](#índice)

```javascript
const UserModel = require("../model/userModel"); // Importando model

exports.signUp = async (req, res) => {
  const { email, name, password } = req.body; // obtendo dados do formulário

  try {
    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      throw new Error("Usuário já cadastrado");
    }

    const newUser = new UserModel({ name, email, password });

    try {
      await newUser.save();
      res.status(201).json({
        message: "Usuário criado com sucesso",
        newUser,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
```

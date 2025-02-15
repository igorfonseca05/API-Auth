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

Eles serão adicionados ao package.json como dependencias. Na raiz do projeto vamos criar o **server.js** que é onde vamos adicionar toda a lógica por trás do servidor.

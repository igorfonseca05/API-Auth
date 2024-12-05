
const yargs = require('yargs')
const fs = require('fs');


// const argv = yargs
//     .option('name', {
//         alias: 'n',
//         describe: 'Seu nome',
//         type: 'string',
//         demandOption: true
//     }).argv

// // console.log('Olá' + ' ' + argv.name)

// const product = yargs.option('name', {
//     alias: 'n',
//     describe: 'Seu produto',
//     type: 'string',
//     demandOption: true
// }).argv

// console.log('O produto adicionado ao carrinho foi' + ' ' + product.name)
// const yargs = require("yargs");

yargs
    .command(
        "add", // Nome do comando
        "Adiciona notas aos arquivo json", // Descrição do comando
        {
            // Configuração do argumento 'title'
            title: {
                alias: "t",
                describe: "Título da nota",
                type: "string",
                demandOption: true, // Torna obrigatório
            },
            // Configuração do argumento 'body'
            body: {
                alias: "b",
                describe: "Conteúdo da nota",
                type: "string",
                demandOption: true, // Torna obrigatório
            },
        },
        (argv) => {
            // Corrigido: argv.body
            const dados = { title: argv.title, content: argv.body };
            const jsonNotes = JSON.stringify(dados)

            fs.writeFileSync('note.json', jsonNotes, { flag: 'a' })

            console.log('Nota adicionada com sucesso')
        }
    ).command(
        'show',
        "comando usado para mostrar notas",
        {
            notes: {
                alias: 'n',
                describe: 'Usamos esse comando para ler as notas',
                demandOption: true,
                type: 'string'
            },
        },
        (argv) => {

            const notes = fs.readFileSync('note.json').toString()
            // const parsedData = JSON.parse(notes)

            console.log(JSON.parse(notes))

        }
    ).command({
        command: 'delete',
        describe: 'Deletar nota',
        builder: {
            title: {
                alias: 't',
                describe: 'Deletar notas',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {

        }
    }).help().argv


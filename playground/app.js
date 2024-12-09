const fs = require('fs')
const { parse } = require('path')


const read = fs.readFileSync('note.json').toString()

const parsedData = JSON.parse(read)

parsedData.name = 'Alan'
parsedData.age = '29'

const addToNotes = fs.writeFileSync('note.json', JSON.stringify(parsedData), { flag: 'w' })

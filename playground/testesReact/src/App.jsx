import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  /**Aqui vamos praticar como manipular objetos no js */

  const livro = {
    titulo: "A Jornada do JavaScript",
    autor: "Ana Programadora",
    anoPublicacao: 2022,
    paginas: 350,
    genero: "Tecnologia",
    disponibilidade: {
      emEstoque: true,
      quantidade: 120,
    },
    tags: ["JavaScript", "Programação", "Desenvolvimento Web"],
  };


  // 1- Clonar objetos

  const newObj = { ...livro }

  const newObj2 = Object.assign({}, livro)

  console.log(newObj === newObj2 === livro)

  /*O resultado o console.log acima é false, pois são clones, mas são diferentes */



  return (
    <>
      <h1>oi</h1>
      {/* <button>Click</button> */}
    </>
  )
}

export default App

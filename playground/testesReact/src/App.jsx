import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  // 1 - CASO 1
  // /**Aqui teremos um erro, pois a atualização do componente está sendo
  //  * feita diretamente no corpo do componente, e isso pode gerar um looping
  //  * infinito, podendo ser evitado adicionando a atualização do componente
  //  * dentro de uma condicional ou dentro de uma função/evento
  // */
  // const [count, setCount] = useState(0)
  // setCount(count + 1)

  // 2-CASO
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1)
    if (count <= 51) {
      return
    }

  }, [])


  return (
    <>
      <h1>{count}</h1>
      <button>Click</button>
    </>
  )
}

export default App

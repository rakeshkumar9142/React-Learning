import { useState } from 'react'
import './App.css'
import Card from './components/Card'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="bg-green-400 text-black rounded-xl">Tailwind Test</h1>
      <Card/>
    </>
  )
}

export default App

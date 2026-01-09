import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactForm from './components/WebForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ContactForm />
    </>
  )
}

export default App

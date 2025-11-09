import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/navbar'
import Home from './components/home'
import ComponentName from './components/home'
import Hero from './components/home'
import UniNews from './components/cred'
import Footer from './components/footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Hero/>
      <UniNews/>
      <Footer/>
    </>
  )
}

export default App

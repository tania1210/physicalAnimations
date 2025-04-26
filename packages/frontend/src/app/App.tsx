import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import SnakePage from './SnakePage'

function App() {
  return (
    <BrowserRouter>
    <nav>
      <Link to="/">Home</Link> | <Link to="/snake">Snake</Link>
    </nav>
    <Routes>
      <Route path="/" element={<h1>Welcome to home</h1>}></Route>
      <Route path='/snake' element={<SnakePage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Welcome to React CI/CD App')

  return (
    <div className="container">
      <h1>{message}</h1>
      <div className="button-group">
        <button onClick={() => setMessage('Hello React!')}>Say</button>
        <button onClick={() => setMessage('Welcome!')}>Welcome</button>
        <button onClick={() => setMessage('Welcome to React CI/CD App')}>Reset</button>
      </div>
    </div>
  )
}

export default App

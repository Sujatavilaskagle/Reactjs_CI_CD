import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setMessage('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://nodejsproject-ci-cd.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setUserId(data.userId)
        setEmail('')
        setPassword('')
      } else {
        setMessage(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('API Error:', error)
      setMessage('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>User Registration</h1>
      <form onSubmit={handleRegister} className="form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && <p className={userId ? 'success' : 'error'}>{message}</p>}
      {userId && <p className="userId">User ID: {userId}</p>}
    </div>
  )
}

export default App

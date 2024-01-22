import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


function LoginForm({ setLogged, setUser, setMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setLogged(true)
      setMessage('Welcome to the app')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
    catch(error) {
      console.error(error)
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 6000)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>

        <label htmlFor="userName">User Name</label>
        <input id="userName" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm

LoginForm.propTypes = {
  setLogged: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}
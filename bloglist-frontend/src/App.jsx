import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogComponent from './components/BlogComponent'
import Togglable from './components/Togglable'


const App = () => {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setLogged(true)
      blogService.setToken(user.token)
      console.log('undefined', blogService.token)

    }

  }, [logged])

  return (
    <div>
      <h1>Welcome to the blog app</h1>

      {message === null ? <h1></h1> : <h1 id='message' style={{ background: 'grey', display: 'inline-block', border: '2px solid', color: message === 'Welcome to the app' || message === 'Blog Created Succesfully' ? 'green' : 'red' }}>{message}</h1>}
      {logged ?
        <>
          <BlogComponent setLogged={setLogged} user={user} setUser={setUser} message={message} setMessage={setMessage}/>

        </> :
        <Togglable label='login'>
          <LoginForm setLogged={setLogged} logged={logged} user={user} setUser={setUser} message={message} setMessage={setMessage}/>
        </Togglable>
      }

    </div>
  )
}

export default App
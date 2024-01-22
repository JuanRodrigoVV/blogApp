import React from 'react'
import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import AddBlog from './AddBlog'
import Togglable from './Togglable'

function BlogComponent({ setLogged, user, setUser, setMessage }) {

  const [blogs, setBlogs] = useState([])
  const togglableRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(initialBlogs)
        console.log('this is', initialBlogs)
      })
  }, [])

  const handleLogout = () => {
    setLogged(false)
    setUser(null)
    window.localStorage.clear()
  }
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={handleLogout}>LogOut</button>
      <Togglable label='Add new Blog' ref={togglableRef}>
        <AddBlog blogs={blogs} setBlogs={setBlogs} user={user} setMessage={setMessage} togglableRef={togglableRef}/>
      </Togglable>

    <div >

      {blogs.map(blog =>
        <div  key={blog.id}>
          <h1>{blog.title}</h1>
          <Blog user={user}  blog={blog} setBlogs={setBlogs}/>
        </ div>
      )}

      </div>


    </div>
  )
}

export default BlogComponent
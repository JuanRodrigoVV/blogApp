import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

function AddBlog({ blogs, setBlogs, user, togglableRef, setMessage }) {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = event => {
    event.preventDefault()
    const blog = {
      title: title,
      author: user.name,
      url: url,
      likes: 0,
      userId: user.id
    }

    blogService
      .create(blog)
      .then(response => {
        const newBlogs = [...blogs, response]
        newBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(newBlogs)
        setAuthor('')
        setTitle('')
        setUrl('')
        togglableRef.current.visibleFunc()
        setMessage('Blog Created Succesfully')
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(error => {
        console.error('Error al crear blog:', error)
        setMessage('Error Creating Blog')
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })

  }
  return (
    <div>
      <form onSubmit={handleAddBlog}>


        <label htmlFor="title">Title</label>
        <input className='title' onChange={e => setTitle(e.target.value)} type="text"  id='title' value={title}/>
        <label htmlFor="url">Url</label>
        <input className='url' onChange={e => setUrl(e.target.value)} type="text" id='url' value={url}/>
        <button type='submit'>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog
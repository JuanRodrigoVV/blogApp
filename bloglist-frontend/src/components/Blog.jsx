import { useState } from 'react'
import blogservice from '../services/blogs'

function Blog({ blog, setBlogs, user }) {

  const [visible, setVisible] = useState(false)



  const handleLike = async event => {
    event.preventDefault()
    const newBlog = {
      title: blog.title,
      author: user.name,
      url: blog.url,
      userId: blog.user.id,
      id: blog.id,
      likes: blog.likes + 1
    }

    try {
      await blogservice.like(newBlog)
      const updatedBlogs = await blogservice.getAll()
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
      console.log('Updated blogs:', updatedBlogs)
    } catch (error) {
      console.error(error)
    }

  }

  const handleDelete = async event => {
    const blogToDelete = {
      id: blog.id,
      user: blog.user.id
    }
    event.preventDefault()
    if (window.confirm('Estas seguro de que quieres eliminar el blog')) {try {
      const response = await blogservice.deleteBlog(blogToDelete)
      console.log(response)
      const updatedBlogs = await blogservice.getAll()
      setBlogs(updatedBlogs)


    } catch (error) {
      console.error(error)
    }} else {
      return
    }
  }

  return (
    <div data-testid="blog-container">
      <h2>Author: {blog.author}</h2>

      <h3>Title: {blog.title}</h3>
      {visible ? <div>

        <h3>Likes: {blog.likes}</h3>
        <h1>{blog.url}</h1>
        <button id='likeButton' onClick={handleLike}>Like</button>
        <button onClick={() => setVisible(false)}>Close</button>
        {JSON.stringify(blog.user.id) === JSON.stringify(user.id) ? <button onClick={handleDelete}>Delete</button> : <></>}
      </div> :
        <button className='showMoreButton' onClick={() => setVisible(true)}>Show More</button>}
    </div>
  )
}

export default Blog
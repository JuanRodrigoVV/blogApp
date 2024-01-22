const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const UserZ = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')




blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/api/blogs', middleware.getTokenFrom,  async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.messi, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid Token' })
  }

  const user = await UserZ.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })


  if(!body.title || !body.url || !user || !body.author) {
    console.log('Bad Request: Missing field')
    return response.status(400).json({ error: 'Title and URL are required' }).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/api/blogs/:id', middleware.getTokenFrom, middleware.userExtractor, async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.messi, process.env.SECRET)

    if(!decodedToken.id) {
      response.status(401).json({ error: 'invalid username or password' })
    }

    if (request.user !== decodedToken.id) {
      return response.status(403).json({ error: 'Permission denied', token: `${decodedToken.id}`, user: `${request.user}` })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(200).json({ message: 'Blog delated succesfully' })
  }
  catch(error) {
    next(error)
  }

})

// Get Individual Blog

blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    response.status(404).end()
  } else {
    response.json(blog)
  }
})

// Update Blog

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  console.log(body.id)
  if(!blog) {
    response.status(404).end()
  } else {
    try {


      const updatedBlog =  await Blog.findByIdAndUpdate(body.id,
        {
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes,
          userId: body.userId
        },
        { new: true })
      console.log('hola')
      response.status(200).json(updatedBlog)
    } catch(error) {
      console.error('Error updating blog:', error)
      response.status(500).json({ error: 'Internal Server Error' })
    }
  }
})




module.exports = blogsRouter
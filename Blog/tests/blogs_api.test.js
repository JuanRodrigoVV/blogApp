const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helpers')
const Blog = require('../models/blog')

beforeEach(async () => {
  jest.setTimeout(10000)
  await Blog.deleteMany({})
  const blogObject = helper.initialBlog.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})



test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(5)
  console.log(response.body)
})


test('Blog number one', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('Id is true', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.every(blog => blog.id)).toBeDefined()

})

test('A valid blog', async () => {

  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'albersofernandez',
      password: 'alberso'
    })


  const token = loginResponse.body.token

  const newBlog = {
    title: 'The new Blog',
    author: 'The best author',
    url: 'thebesturl.com',
    likes: 4,
    userId: '6565ff39521eb22fa11bc034'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)
  expect(blogsAtEnd[blogsAtEnd.length -1].title).toContain(
    'The new Blog'
  )


})

test('No token test', async () => {

  const newBlog = {
    title: 'The new Blog',
    author: 'The best author',
    url: 'thebesturl.com',
    likes: 4,
    userId: '6565ff39521eb22fa11bc034'
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  expect(response.body).toMatchObject({ error: 'Invalid or missing token' })

})

test('Likes is 0', async () => {
  const newBlog = {
    title: 'The new Blog',
    author: 'The best author',
    url: 'thebesturl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length -1].likes).toStrictEqual(0)
})

test('blog 123', async () => {
  const newBlog = {
    title: 'title 1',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})



test('Deleting', async() => {
  await api
    .delete('/api/blogs/5a422aa71b54a676234d17f1')

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length -1)
})


test('Updating Likes', async() => {


  const newBlog = {
    title: 'The new Blog',
    author: 'The best author',
    url: 'thebesturl.com',
    likes: 25
  }

  await api
    .put('/api/blogs/5a422aa71b54a676234d17f1')
    .send(newBlog)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toStrictEqual(25)
})

afterAll(async () => {
  await mongoose.connection.close()
})
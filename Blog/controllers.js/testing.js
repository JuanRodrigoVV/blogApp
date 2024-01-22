const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const UserZ = require('../models/user')

testingRouter.post('/api/testing/reset', async (request, response) => {
  await Blog.deleteMany({})
  await UserZ.deleteMany({})

  response.status(201).end()
})

module.exports = testingRouter
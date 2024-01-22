const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const loginRouter = require('./controllers.js/login')
const blogsRouter = require('./controllers.js/blogs')
const usersRouter = require('./controllers.js/user')
mongoose.set('strictQuery', false)





mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to mongodb')
  })
  .catch((error) => {
    logger.error('error connecting to MognoDB', error)
  })
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers.js/testing')
  app.use(testingRouter)
}

app.use(loginRouter)
app.use(blogsRouter)
app.use(usersRouter)
app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)


module.exports = app
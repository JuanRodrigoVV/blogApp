const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const UserZ = require('../models/user')

usersRouter.get('/api/users', async (request, reponse) => {
  const users = await UserZ.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  reponse.json(users)
})

usersRouter.post('/api/users', async (request, response) => {
  const { userName, name, password } = request.body

  if (!userName || !password) {
    response.status(401).json({ error: 'You must prodive a username and a password' })
  }
  else if (userName.length < 3 || password.length < 3) {
    response.status(401).json({ error: 'Username and password must be at least 3 characters long' })
  } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new UserZ ({
      userName,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }

})

module.exports = usersRouter
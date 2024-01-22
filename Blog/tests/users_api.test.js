const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const UserZ = require('../models/user')

beforeEach(async () => {
  await UserZ.deleteMany({})
  const passwordHash = await bcrypt.hash('SKRT', 10)
  const user = new UserZ({ userName: 'usuarioprueba', name: 'nombreprueba', passwordHash })
  await user.save()
})

describe('Testing the users', () => {
  test('returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('new user', async() => {


    const usersAtStart = await UserZ.find({})
    const newUser = {
      userName: 'pepe',
      name: 'pepe',
      password: 'asdasdasdasd'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await UserZ.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  })

  test('wrong user', async() => {
    const newUser = {
      userName: 'pe',
      name: 'pepe',
      password: 'asdasdasdasd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password must be at least 3 characters long')
  })

  test('missing field', async() => {
    const newUser = {
      name: 'pepe',
      password: 'asdasdasdasd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('You must prodive a username and a password')
  })


})

afterAll(async () => {
  await mongoose.connection.close()
})
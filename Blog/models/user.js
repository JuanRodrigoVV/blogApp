const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userZSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userZSchema.plugin(uniqueValidator)

userZSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const UserZ = mongoose.model('UserZ', userZSchema)

module.exports = UserZ

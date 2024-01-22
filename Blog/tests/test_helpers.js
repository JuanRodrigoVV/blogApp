const Blog = require('../models/blog')
const initialBlog = [
  {
    _id: '5a422aa71b54a676234d17f1', // Cambié el último dígito para hacerlo único
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f3',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f4',
    title: 'Testing Result',
    author: 'Rodri Author',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 8,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Testing Result',
    author: 'Rodri Author',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 28,
    __v: 0
  }
]



const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map( blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'To Remove' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

module.exports ={
  initialBlog,
  blogsInDb,
  nonExistingId
}
const dummy = (blogs) => {
  if(blogs){
    return 1}
}


// Total Likes
const totalLikes = (list) => {
  if (list.length === 1) {
    return list[0].likes
  } else {
    return list.reduce((acc, value) => acc += value.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((acc, value) => {
    if(value.likes > acc.likes){
      acc.title = value.title
      acc.author = value.author
      acc.likes = value.likes
    }
    return acc
  }, { title: '', author: '', likes: 0 })
  return result
}
// Total Likes

// Most Blogs
const mostBlogs = (blogs) => {
  const result = blogs.reduce((acc, value) => {
    if(!acc[value.author]) {
      acc[value.author] =  { name: value.author, blogs: 1 }
    } else {
      acc[value.author].blogs += 1
    }
    return acc


  }, [])

  const keys = Object.keys(result).map(el => {
    return { name: el, blogs: result[el].blogs }
  })
    .reduce((acc, value) => {
      if(value.blogs > acc.blogs) {
        acc.name = value.name
        acc.blogs = value.blogs
      }
      return acc
    },  { name: '', blogs: 0 })
  return keys
}
// Most Blogs

const mostLikes = (blogs) => {
  const result = blogs.reduce((acc, value) => {
    if (!acc[value.author]) {
      acc[value.author] = { name: value.author, likes: value.likes }
    } else {
      acc[value.author].likes += value.likes
    }
    return acc
  }, {})
  let author = { author: '', likes: 0 }
  Object.keys(result).map(el => {
    if(result[el].likes > author.likes) {
      author = { author: el, likes: result[el].likes }
    }

  })
  return author
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
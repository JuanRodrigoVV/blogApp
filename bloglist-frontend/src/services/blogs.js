import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log('this is 123', newToken)
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  console.log('new token',token)
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    console.error('Error al crear blog:', error.response.data)
    throw error
  }


}
const like = async likedBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${likedBlog.id}`
  try{
    const response = await axios.put(url, likedBlog, config)
    return response.data

  }
  catch(error) {
    console.error(error)

  }
}


const deleteBlog = async blogToDelete => {
  const blogOwner = {
    user: blogToDelete.user
  }

  const config = {
    headers: { Authorization: token },
    data: { user: blogToDelete.user }
  }
  const url = `${baseUrl}/${blogToDelete.id}`
  try {
    const response = await axios.delete(url, config)
    return response.data
  }
  catch(error) {
    console.error(error)

  }
}

export default { getAll, create, setToken, token, like, deleteBlog }


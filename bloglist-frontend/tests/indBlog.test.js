import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'
import blogservice from '../src/services/blogs'
import AddBlog from '../src/components/AddBlog'




test('renders content', async () => {
  const blog = {
    title: 'the fourth blog',
    author: 'Borges',
    url: 'fourthblog.com.ar',
    likes: 2,
    id: '6569ea296d44bed3286bedf1',
    user: {
      userName: 'rodrigo',
      name: 'Juan Rodrigo',
      id: '6567783dc8750326773b9299'
    },
  }
  const user2 = {
    userName: 'rodrigo',
    name: 'Juan Rodrigo',
    id: '6567783dc8750326773b9299'
  }

  render(<Blog user={user2} blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('Show More')
  const authorElement = screen.getByText('Author: Borges')
  const titleElement = screen.getByText('Title: the fourth blog')
  const divElement = screen.getByTestId('blog-container')
  const urlElement = screen.queryByText('fourthblog.com.ar')
  expect(urlElement).not.toBeInTheDocument()
  const likesElement = screen.queryByText('Likes: 2')
  expect(likesElement).not.toBeInTheDocument()
  expect(divElement).toContainElement(authorElement)
  expect(divElement).toContainElement(titleElement)

  // Click and second elements render
  await user.click(button)

  const urlAfterClick = await screen.findByText('fourthblog.com.ar')
  const likesAfterClick = await screen.findByText('Likes: 2')

  // Verifica que los elementos estén presentes en el contenedor
  expect(divElement).toContainElement(authorElement)
  expect(divElement).toContainElement(titleElement)
  expect(divElement).toContainElement(urlAfterClick)
  expect(divElement).toContainElement(likesAfterClick)


})

test('clicking the button', async () => {
  const blog = {
    title: 'the fourth blog',
    author: 'Borges',
    url: 'fourthblog.com.ar',
    likes: 2,
    id: '6569ea296d44bed3286bedf1',
    user: {
      userName: 'rodrigo',
      name: 'Juan Rodrigo',
      id: '6567783dc8750326773b9299'
    },
  }
  const user2 = {
    userName: 'rodrigo',
    name: 'Juan Rodrigo',
    id: '6567783dc8750326773b9299'
  }
  render(<Blog user={user2} blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('Show More')
  const mockBlogHandlerLike = jest.spyOn(blogservice, 'like')
  await user.click(button)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await waitFor(() => {
    expect(mockBlogHandlerLike).toHaveBeenCalledTimes(1)
  })

})

test('AddBlog form calls event handler with the right details', async () => {
  const mockBlogs = []
  const mockSetBlogs = jest.fn()
  const mockUser = {
    id: '6567783dc8750326773b9299',
    name: 'Juan Rodrigo',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njc3ODNkYzg3NTAzMjY3NzNiOTI5OSIsImlhdCI6MTcwMTcwMzAwMn0.xOUgVac9gpxEgSMQKtYTjlPOab9zfK0n_rsd8xgJEAE'
  }
  const mockTogglableRef = { current: { visibleFunc: jest.fn() } }
  const mockSetMessage = jest.fn()
  const mockBlogHandlerCreate = jest.spyOn(blogservice, 'create')


  render(
    <AddBlog blogs={mockBlogs} setBlogs={mockSetBlogs} user={mockUser} togglableRef={mockTogglableRef} setMessage={mockSetMessage} />
  )

  // Fill in the form inputs
  const titleInput = screen.getByLabelText('Title')
  const urlInput = screen.getByLabelText('Url')
  blogservice.setToken(mockUser.token)

  await userEvent.type(titleInput, 'Test Blog Title')
  await userEvent.type(urlInput, 'https://example.com')

  // Submit the form
  const addButton = screen.getByText('Add Blog')
  fireEvent.click(addButton)

  // Verify that the event handler (handleAddBlog) was called with the right details
  await waitFor(() => {
    expect(mockBlogHandlerCreate).toHaveBeenCalledTimes(1)
  })
  expect(mockBlogHandlerCreate).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Juan Rodrigo',
    url: 'https://example.com',
    likes: 0,
    userId: '6567783dc8750326773b9299'
  })
})

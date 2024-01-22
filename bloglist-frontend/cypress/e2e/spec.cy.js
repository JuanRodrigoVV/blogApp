beforeEach(function() {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
 const user = {
    userName: 'Borges',
    name: 'Borges',
    password: 'password'
    
  }
  const user2 = {
    userName: 'Borges2',
    name: 'Borges',
    password: 'password'

  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
  cy.visit('http://localhost:5173')
})
describe('Blog app', function() {

  it('Display Login', function() {
    cy.contains('login').click()
    cy.get('#userName')
    cy.get('#password')
  })
})

describe('login and not login', function() {

  it('login', function() {
    cy.contains('login').click()
    cy.get('#userName').type('Borges')
    cy.get('#password').type('password')
    cy.contains('Login').click()
    cy.contains('Welcome Borges')
  })

  it('failed login', function() {
    cy.contains('login').click()
    cy.get('#userName').type('Borges')
    cy.get('#password').type('Hello')
    cy.contains('Login').click()
    cy.contains('Wrong username or password')
    cy.get('#message')
  })
})

describe('Logged do things', function() {

  beforeEach(function() {
    cy.contains('login').click()
    cy.get('#userName').type('Borges')
    cy.get('#password').type('password')
    cy.contains('Login').click()
    cy.contains('Welcome Borges')
  })

  it('login', function() {
    cy.contains('Add new Blog').click()
    cy.get('#title').type('Testing the blog title')
    cy.get('#url').type('testingtheblogurl.com')
    cy.contains('Add Blog').click()
    cy.contains('Testing the blog title')
    cy.contains('Author: Borges')
    cy.contains('Title: Testing the blog title')
    
  })
  
  it('like a post', function() {
    cy.contains('Add new Blog').click()
    cy.get('#title').type('Testing the blog title')
    cy.get('#url').type('testingtheblogurl.com')
    cy.contains('Add Blog').click()
    cy.contains('Testing the blog title')
    cy.contains('Author: Borges')
    cy.contains('Title: Testing the blog title')
    cy.contains('Show More').click()
    cy.get('#likeButton').click()
    cy.contains('Likes: 1')

  })


})

describe.only('delete', function() {
  beforeEach(function() {
    cy.login({ username: 'Borges', password: 'password' })
    cy.createBlog({ title: 'new title', url: 'newUrl' })
  })

  it('deleteNote', function() {
    cy.visit('')
    cy.contains('Show More').click()
    cy.contains('Delete').click()
    cy.get('new title').should('not.exist')
  })

  it('only blog owner can delete', function() {
    cy.visit('')
    cy.contains('LogOut').click()
    cy.contains('login').click()
    cy.get('#userName').type('Borges2')
    cy.get('#password').type('password')
    cy.contains('Login').click()
    cy.contains('Show More').click()
    cy.get('Delete').should('not.exist')
  })

  it.only('ordered blogs', function() {
    cy.visit('');
    cy.createBlog({ title: 'other title', url: 'newUrl' });
    cy.createBlog({ title: 'another more', url: 'newUrl' });
    cy.visit('');
    cy.get('.showMoreButton').eq(1).click()
    cy.get('#likeButton').click()
    cy.get('.blogsContainer').eq(0).should('contain', 'other title')
    
 
  

  })
})
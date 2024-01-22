Cypress.Commands.add('login', ({username, password}) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username, password
    }).then(({body}) =>{
        localStorage.setItem('loggedUser', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, url }) => {
    const user = JSON.parse(localStorage.getItem('loggedUser')).name
    const id = JSON.parse(localStorage.getItem('loggedUser')).id
    const token = JSON.parse(localStorage.getItem('loggedUser')).token
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title: title, author: user, url: url, likes: 0, user: id, userId: id},
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
})


// title: body.title,
// author: body.author,
// url: body.url,
// likes: body.likes,
// user: user.id
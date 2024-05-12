
const bookUl = document.querySelector('#list')
const div = document.querySelector('#show-panel')
fetch('http://localhost:3000/books ')
    .then(res => {
        if (!res.ok) {
            throw new Error('Error!')
        } return res.json()
    }).then(data => {
        data.forEach(book => {
            const li = document.createElement('li')
            li.textContent = book.title
            bookUl.appendChild(li)


            li.addEventListener('click', () => {
                div.innerHTML = `
                <img src="${book.img_url}"><br>
                <h4>${book.title}</h4>
                <h4>${book.subtitle}</h4>
                <h4>${book.author}</h4>
                <h4>${book.description}</h4>

                `

                const usersUl = document.createElement('ul')
                book.users.forEach(user => {
                    const userLi = document.createElement('li')
                    userLi.textContent = user['username']
                    usersUl.appendChild(userLi)
                    div.appendChild(usersUl)
                })



                const btn = document.createElement('button')
                btn.textContent = 'LIKE'
                div.appendChild(btn)


                btn.addEventListener('click', () => {


                    const newUser = { 'id': 1, 'username': 'pouros' }
                    const newObj = [...book.users, newUser]
                    fetch(`http://localhost:3000/books/${book.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({
                            users: newObj

                        })
                    })
                        .then(res => {
                            return res.json()
                        })

                        .then(data => {
                            //console.log(data)
                            usersUl.innerHTML = ''



                            data.users.forEach(user => {
                                const li = document.createElement('li')
                                li.textContent = user['username']
                                usersUl.appendChild(li)
                                //div.appendChild(usersUl)
                            })
                            //div.appendChild(usersUl)
                        })
                    div.appendChild(usersUl)
                })
            })
        })
    })





























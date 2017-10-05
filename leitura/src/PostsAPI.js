
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.


const headers = {
    'Authorization': 'whatever-you-want'
}

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, { headers })
        .then(res => res.json())
        .then(data => data.book)

export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts/`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getPostById = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())
        .then(data => data)

    
export const getCommentsByPost = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data)

export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shelf })
    }).then(res => res.json())

export const search = (query, maxResults) =>
    fetch(`${api}/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, maxResults })
    }).then(res => res.json())
        .then(data => data.books)


export const addPost = (title, body, author, category) => {
    const id = Math.floor((Math.random() * 100000) + 1)+"";
    const timestamp = Date.now()
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ id, timestamp, title, body, author, category })
    }).then(data => data)
    
}

export const removePost = (id) => {
   
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ id })
    }).then().then(data => data)
}
export const voteUp = (id, option) => {
    
     fetch(`${api}/posts/${id}`, {
         method: 'POST',
         headers: {
             ...headers,
             'Content-Type': 'application/json',
 
         },
         body: JSON.stringify({ option })
     }).then()
     
       
 }

 export const voteComment = (id, option) => {
    
     fetch(`${api}/comments/${id}`, {
         method: 'POST',
         headers: {
             ...headers,
             'Content-Type': 'application/json',
 
         },
         body: JSON.stringify({ option })
     }).then()
     
       
 }

 export const updatePost = (id, title, body) => {
    
     fetch(`${api}/posts/${id}`, {
         method: 'PUT',
         headers: {
             ...headers,
             'Content-Type': 'application/json',
 
         },
         body: JSON.stringify({ title, body })
     }).then()
     
       
 }

export const removeComment = (id) => {
    
     fetch(`${api}/comments/${id}`, {
         method: 'DELETE',
         headers: {
             ...headers,
             'Content-Type': 'application/json',
 
         }
     }).then(data => data)
 }

export const addComment = (id, parentId, body, author) => {
   
    const timestamp = Date.now()
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ id, timestamp, parentId, body, author})
    }).then(data => data)
}
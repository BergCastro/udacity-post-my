export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const addPost = ({ title, author, body }) => ({
        type: ADD_POST,
        title,
        author,
        body

})
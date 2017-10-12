import * as PostsAPI from '../PostsAPI'


export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const INCREMENT_VOTE_POST = 'INCREMENT_VOTE_POST'
export const DECREMENT_VOTE_POST = 'DECREMENT_VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const GET_POSTS = 'GET_POSTS'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'




export function getPosts(posts) {

        return {
                type: GET_POSTS,
                payload: posts
        }
}

export function getPostComments(post, comments) {

        return {
                type: GET_POST_COMMENTS,
                payload: {
                        post,
                        comments
                }
        }
}


export function addPost(title, author, category, body) {
        const id = Math.floor((Math.random() * 100000) + 1) + "";
        PostsAPI.addPost(id, title, body, author, category)


        return {
                type: ADD_POST,
                payload: {
                        id: id,
                        timestamp: Date.now(),
                        title,
                        body: body,
                        author: author,
                        category: category,
                        voteScore: 1,
                        deleted: false,

                }
        }
}

export function updatePost(id, title, body) {

        PostsAPI.updatePost(id, title, body)

        return {
                type: UPDATE_POST,
                payload: {

                        title: title,
                        body: body
                }

        }
}

export function removePost(id) {

        PostsAPI.removePost(id)


        return {
                type: REMOVE_POST,
                payload: id

        }
}

export function incrementVotePost(id) {
        PostsAPI.votePost(id, 'upVote')
        return {
                type: INCREMENT_VOTE_POST,
                payload: id

        }
}

export function decrementVotePost(id) {
        PostsAPI.votePost(id, 'downVote')
        return {
                type: DECREMENT_VOTE_POST,
                payload: id

        }
}


export const fetchPosts = () => dispatch => (
        PostsAPI.getAll().then(posts => {
                dispatch(getPosts(posts))
        })

)

export const fetchComments = (id) => dispatch => (

        PostsAPI.getPostById(id).then((post) => {
                PostsAPI.getCommentsByPost(id).then((comments) => {

                        dispatch(getPostComments(post, comments))
                })


        })

)


import {
    ADD_POST,
    INCREMENT_VOTE_POST,
    DECREMENT_VOTE_POST,
    UPDATE_POST,
    REMOVE_POST,
    GET_POSTS,
    GET_POST_COMMENTS

} from '../actions/post'

import {

    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT,
    INCREMENT_VOTE_COMMENT,
    DECREMENT_VOTE_COMMENT,


} from '../actions/comment'


const INITIAL_STATE = {
    posts: [],
    postCurrent: {},
    commentsPost: [],
    categories: [
        'all',
        'react',
        'redux',
        'udacity'
    ]

}




function post(state = INITIAL_STATE, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    { ...payload }
                ]

            }
        case UPDATE_POST:
            return {
                ...state,
                postCurrent: {
                    ...state.postCurrent,
                    title: payload.title,
                    body: payload.body

                }

            }
        case REMOVE_POST:
            return {
                ...state,
                posts:
                state.posts.map((post) => {
                    if (payload === post.id) {
                        return {
                            ...post,
                            deleted: true
                        }
                    }
                    return post

                })

            }

        case INCREMENT_VOTE_POST:
            return {
                ...state,
                postCurrent: {
                    ...state.postCurrent,
                    voteScore: state.postCurrent.voteScore + 1

                }


            }
        case DECREMENT_VOTE_POST:
            return {
                ...state,
                postCurrent: {
                    ...state.postCurrent,
                    voteScore: state.postCurrent.voteScore - 1

                }

            }

        case GET_POST_COMMENTS:
            return {
                ...state,
                postCurrent: { ...payload.post },
                commentsPost: [...payload.comments]
            }
        case GET_POSTS:
            return {
                ...state,
                posts: [...payload]
            }
        case ADD_COMMENT:
            return {
                ...state,
                commentsPost: [
                    ...state.commentsPost,
                    { ...payload }
                ]

            }
        case REMOVE_COMMENT:
            return {
                ...state,
                commentsPost:
                state.commentsPost.map((comment) => {
                    if (payload === comment.id) {
                        return {
                            ...comment,
                            deleted: true
                        }
                    }
                    return comment

                })

            }
        case UPDATE_COMMENT:
            return {
                ...state,
                commentsPost:
                state.commentsPost.map((comment) => {
                    if (payload.id === comment.id) {
                        return {
                            ...comment,
                            body: payload.body
                        }
                    }
                    return comment

                })

            }
        case INCREMENT_VOTE_COMMENT:
            return {
                ...state,
                commentsPost:
                state.commentsPost.map((comment) => {
                    if (payload === comment.id) {
                        return {
                            ...comment,
                            voteScore: comment.voteScore + 1
                        }
                    }
                    return comment

                })

            }
        case DECREMENT_VOTE_COMMENT:
            return {
                ...state,
                commentsPost:
                state.commentsPost.map((comment) => {
                    if (payload === comment.id) {
                        return {
                            ...comment,
                            voteScore: comment.voteScore - 1
                        }
                    }
                    return comment

                })

            }

        default:
            return state
    }
}





export default post